'use server';

import 'dotenv/config';

const LOCK_ENTITY_ID = 'switch.sonoff_1000e6fcb0_1';
const DOOR_SENSOR_ENTITY_ID = 'binary_sensor.1_durvis_durvis';

function getHaConfig() {
    const HA_URL = process.env.HA_URL;
    const HA_TOKEN = process.env.HA_TOKEN;

    if (!HA_URL || !HA_TOKEN) {
        console.error("Home Assistant URL or Token is not configured. Door control will not work.");
        throw new Error('Home Assistant nav konfigurēts.');
    }
    
    return { haUrl: HA_URL, haToken: HA_TOKEN };
}


async function callService(domain: string, service: string, serviceData: object) {
    const { haUrl, haToken } = getHaConfig();

    const response = await fetch(`${haUrl}/api/services/${domain}/${service}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${haToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(serviceData),
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

/**
 * Unlocks the door and waits for it to be opened.
 * Throws an error if the door is not opened within the timeout.
 */
export async function unlockDoorAndAwaitOpen() {
    await turnOnSwitch(LOCK_ENTITY_ID);

    try {
        // Poll for door open status
        const pollUntilOpen = async (timeout = 30000, interval = 500) => {
            const startTime = Date.now();
            while (Date.now() - startTime < timeout) {
                const doorState = await getEntityState(DOOR_SENSOR_ENTITY_ID);
                if (doorState.state === 'on') { // 'on' usually means open for binary_sensor
                    return; 
                }
                await new Promise(resolve => setTimeout(resolve, interval));
            }
            throw new Error('Durvis netika atvērtas laikā.');
        };
        
        await pollUntilOpen();
        
    } finally {
        // Always turn off the switch after the process
        await turnOffSwitch(LOCK_ENTITY_ID);
    }
}
