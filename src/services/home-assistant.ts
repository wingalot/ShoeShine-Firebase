'use server';

import { getActiveSession, clearActiveSession } from './storage';
import Twilio from 'twilio';

function getHaConfig() {
    // VIETTURIS: Lūdzu, aizstājiet šīs vērtības ar savām, ja nepieciešams!
    const HA_URL = "http://192.168.1.101:8123"; 
    const HA_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjMTE4MjQwNjdlYTc0NWI5YTllOGFmMjcxNDViNWQwOSIsImlhdCI6MTc1NTc3NDk4NiwiZXhwIjoyMDcxMTM0OTg2fQ.tKjaJlcFP6TQteVXKV9YUIy5lY0UXR8Od5FSv-D-USo";

    if (!HA_URL || !HA_TOKEN || HA_TOKEN === "AIZSTĀJIET_AR_SAVU_LONG_LIVED_TOKENU") {
        const errorMessage = `CRITICAL: getHaConfig() failed. HA_URL or HA_TOKEN is not set in src/services/home-assistant.ts. Values found: HA_URL=${HA_URL}, HA_TOKEN is ${HA_TOKEN ? 'present' : 'missing'}`;
        console.error(errorMessage);
        throw new Error('Home Assistant nav konfigurēts.');
    }
    
    return { haUrl: HA_URL, haToken: HA_TOKEN };
}

function getTwilioConfig() {
    // Šīs ir testa vērtības, kā norunāts.
    const accountSid = "AC672cb2e950c918ea787d2e36920e8538";
    const authToken = "0f0783593147c4f255d1bf1772190163";
    const twilioPhone = "+12672230874";

    if (!accountSid || !authToken || !twilioPhone) {
        console.warn("Twilio dati nav ievadīti home-assistant.ts. Paziņojumi netiks sūtīti.");
        return { configured: false, client: null, twilioPhone: null };
    }

    const client = Twilio(accountSid, authToken);
    return { configured: true, client, twilioPhone };
}


const LOCK_ENTITY_ID = 'switch.sonoff_1000e6fcb0_1';
const DOOR_SENSOR_ENTITY_ID = 'binary_sensor.1_durvis_durvis';
const HEAT_ENTITY_ID = 'switch.sonoff_1000e6fcb0_4';
const UV_ENTITY_ID = 'switch.sonoff_1000e6fcb0_3';
const FANS_ENTITY_ID = 'switch.sonoff_1000e6fcb0_2';
const MOTOR_ENTITY_ID = 'switch.sonoff_1000f85860';

const CLEANING_CYCLE_DURATION_MS = 14 * 60 * 1000; // 14 minutes
const VENTILATION_CYCLE_DURATION_MS = 1 * 60 * 1000; // 1 minute

async function callService(domain: string, service: string, serviceData: object) {
    const { haUrl, haToken } = getHaConfig();

    const response = await fetch(`${haUrl}/api/services/${domain}/${service}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${haToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(serviceData),
        cache: 'no-store' // Ensure fresh calls every time
    });

    if (!response.ok) {
        const errorBody = await response.text();
        console.error("Home Assistant API kļūda:", errorBody);
        throw new Error(`Neizdevās sazināties ar Home Assistant. Status: ${response.status}`);
    }
    return response.json();
}

async function getEntityState(entityId: string): Promise<{ state: string }> {
    const { haUrl, haToken } = getHaConfig();

    const response = await fetch(`${haUrl}/api/states/${entityId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${haToken}`,
            'Content-Type': 'application/json',
        },
        cache: 'no-store' // Ensure fresh state is read
    });

    if (!response.ok) {
       const errorBody = await response.text();
       console.error("Home Assistant API kļūda:", errorBody);
       throw new Error(`Neizdevās iegūt entītijas stāvokli. Status: ${response.status}`);
    }

    return response.json();
}

async function turnOnSwitch(entityId: string) {
    return callService('switch', 'turn_on', { entity_id: entityId });
}

async function turnOffSwitch(entityId: string) {
    return callService('switch', 'turn_off', { entity_id: entityId });
}

async function pollDoorState(targetState: 'on' | 'off', timeout = 30000, interval = 500) {
    const startTime = Date.now();
    while (Date.now() - startTime < timeout) {
        const doorState = await getEntityState(DOOR_SENSOR_ENTITY_ID);
        if (doorState.state === targetState) {
            return;
        }
        await new Promise(resolve => setTimeout(resolve, interval));
    }
    throw new Error(`Laika limits (30s) pārsniegts, gaidot durvju stāvokli: '${targetState}'.`);
}

/**
 * Unlocks the door and waits for it to be opened.
 * Throws an error if the door is not opened within the timeout.
 */
export async function unlockDoorAndAwaitOpen() {
    await turnOnSwitch(LOCK_ENTITY_ID);

    try {
        // Poll for door open status
        await pollDoorState('on'); // 'on' usually means open for binary_sensor
    } finally {
        // Always turn off the switch after the process
        await turnOffSwitch(LOCK_ENTITY_ID);
    }
}

/**
 * Waits for the door to be closed.
 * Throws an error if the door is not closed within the timeout.
 */
export async function awaitDoorClose() {
    // Poll for door close status
    await pollDoorState('off'); // 'off' usually means closed
}

async function sendSmsMessage(to: string, message: string) {
    const { configured, client, twilioPhone } = getTwilioConfig();
    if (!configured || !client || !twilioPhone) {
        console.log(`Twilio nav konfigurēts. Simulēta SMS ziņa uz ${to}: "${message}"`);
        return;
    }

    try {
        await client.messages.create({
            body: message,
            from: twilioPhone,
            to: `+371${to}` // Pievienojam Latvijas kodu
        });
        console.log(`SMS ziņa veiksmīgi nosūtīta uz ${to}`);
    } catch (error) {
        console.error(`Kļūda sūtot SMS ziņu uz ${to}:`, error);
        // Neizmetam kļūdu, jo paziņojuma nenosūtīšana nav kritiska
    }
}


async function sendCompletionNotification() {
    const session = await getActiveSession();
    if (session) {
        const message = `Jūsu apavi ir gatavi izņemšanai. Kods, lai atvērtu durtiņas - ${session.code}`;
        await sendSmsMessage(session.phone, message);
    }
}


/**
 * Stops the cleaning cycle by turning off all related switches,
 * and then starts the ventilation cycle.
 */
export async function stopCleaningCycle() {
    console.log("Beidzas tīrīšanas cikls...");
    try {
        await Promise.all([
            turnOffSwitch(HEAT_ENTITY_ID),
            turnOffSwitch(UV_ENTITY_ID),
            turnOffSwitch(FANS_ENTITY_ID)
        ]);
        console.log("Siltums, UV-C un ventilatori ir izslēgti. Sākas vēdināšanas cikls.");
        
        // Start ventilation cycle
        await turnOnSwitch(MOTOR_ENTITY_ID);
        console.log("Motors ieslēgts uz 1 minūti.");

        // Schedule motor to turn off and send notification
        setTimeout(async () => {
            try {
                await turnOffSwitch(MOTOR_ENTITY_ID);
                console.log("Vēdināšanas cikls beidzies, motors izslēgts.");
                await sendCompletionNotification();
            } catch (error) {
                 console.error("Kļūda, izslēdzot motoru vai sūtot paziņojumu:", error);
            }
        }, VENTILATION_CYCLE_DURATION_MS);

    } catch (error) {
        console.error("Kļūda, beidzot tīrīšanas ciklu:", error);
    }
}

/**
 * Starts the cleaning cycle and schedules it to stop.
 * This function runs on the server and is not blocking.
 */
export async function startCleaningCycle() {
    console.log("Sākas tīrīšanas cikls servera pusē...");
    try {
        await Promise.all([
            turnOnSwitch(HEAT_ENTITY_ID),
            turnOnSwitch(UV_ENTITY_ID),
            turnOnSwitch(FANS_ENTITY_ID)
        ]);
        console.log("Siltums, UV-C un ventilatori ir ieslēgti.");

        // Schedule the stop function to run after the duration.
        // This runs on the server and will not be interrupted if the user navigates away.
        setTimeout(stopCleaningCycle, CLEANING_CYCLE_DURATION_MS);

        console.log(`Tīrīšanas cikls beigsies pēc ${CLEANING_CYCLE_DURATION_MS / 1000 / 60} minūtēm.`);
        
    } catch (error) {
        console.error("Kļūda, sākot tīrīšanas ciklu:", error);
        // Attempt to turn everything off in case of a partial failure
        await stopCleaningCycle();
        // Re-throw the error to be caught by the UI
        throw error;
    }
}

export async function checkCode(code: string): Promise<boolean> {
    const session = await getActiveSession();
    if (session && session.code === code) {
        return true;
    }
    return false;
}

export async function finishSession() {
    await clearActiveSession();
    console.log("Sesija pabeigta, numurs un kods izdzēsti.");
}
