module.exports = {

"[externals]/fs/promises [external] (fs/promises, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("fs/promises", () => require("fs/promises"));

module.exports = mod;
}}),
"[project]/src/services/storage.ts [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/* __next_internal_action_entry_do_not_use__ [{"000d00a7e5ee24027cbe0eb5814f088db3497c2a5a":"getActiveSession","00af80dfd8b5b1bd663102b11c9e04e48152ab8a16":"clearActiveSession","40c692b51c4f41089214b94b35d452efd1e00478e5":"createSession"},"",""] */ __turbopack_context__.s({
    "clearActiveSession": (()=>clearActiveSession),
    "createSession": (()=>createSession),
    "getActiveSession": (()=>getActiveSession)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$app$2d$render$2f$encryption$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/app-render/encryption.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs/promises [external] (fs/promises, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
// WARNING: This is a simple file-based storage for a single-session kiosk.
// It is NOT suitable for multi-user or concurrent environments.
const DB_PATH = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), '.db.json');
async function readDb() {
    try {
        const data = await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].readFile(DB_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            return null; // File doesn't exist, which is fine.
        }
        console.error("Failed to read from storage:", error);
        throw new Error("Could not read session data.");
    }
}
async function writeDb(data) {
    try {
        if (data === null) {
            await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].unlink(DB_PATH);
        } else {
            await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
        }
    } catch (error) {
        console.error("Failed to write to storage:", error);
        throw new Error("Could not save session data.");
    }
}
async function getActiveSession() {
    return await readDb();
}
async function createSession(phone) {
    const existingSession = await getActiveSession();
    if (existingSession) {
        // This case should ideally not happen if the UI is properly disabled.
        throw new Error("Another session is already in progress.");
    }
    // Generate a random 6-digit code.
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const newSession = {
        phone: phone,
        code: code,
        startTime: new Date().toISOString()
    };
    await writeDb(newSession);
    console.log(`Session created for ${phone} with code ${code}`);
    return newSession;
}
async function clearActiveSession() {
    await writeDb(null);
    console.log("Active session cleared.");
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getActiveSession,
    createSession,
    clearActiveSession
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getActiveSession, "000d00a7e5ee24027cbe0eb5814f088db3497c2a5a", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createSession, "40c692b51c4f41089214b94b35d452efd1e00478e5", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(clearActiveSession, "00af80dfd8b5b1bd663102b11c9e04e48152ab8a16", null);
}}),
"[externals]/util [external] (util, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}}),
"[externals]/stream [external] (stream, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}}),
"[externals]/http [external] (http, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}}),
"[externals]/https [external] (https, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}}),
"[externals]/fs [external] (fs, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}}),
"[externals]/crypto [external] (crypto, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}}),
"[externals]/assert [external] (assert, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}}),
"[externals]/tty [external] (tty, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("tty", () => require("tty"));

module.exports = mod;
}}),
"[externals]/net [external] (net, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}}),
"[externals]/zlib [external] (zlib, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}}),
"[externals]/events [external] (events, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}}),
"[externals]/tls [external] (tls, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}}),
"[externals]/os [external] (os, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}}),
"[externals]/buffer [external] (buffer, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}}),
"[externals]/querystring [external] (querystring, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("querystring", () => require("querystring"));

module.exports = mod;
}}),
"[project]/src/services/home-assistant.ts [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/* __next_internal_action_entry_do_not_use__ [{"00027fe208bf50e5661920fb5dc11c0a41340fb25f":"stopCleaningCycle","008df63600d91d9a8264378ee15ef35eabaca97cb7":"unlockDoorAndAwaitOpen","008fffe3e34bf53ce2c670697b947f58dcf79d32bf":"finishSession","00a044523e88c7e353cac9adc9b30c6a06e0a80440":"forceResetState","00c3337b8c2cac0f6c3b58dc213e2b378176a07227":"awaitDoorClose","00ff896f99e7593a911e9a4d76d3e311940c7a0e65":"startCleaningCycle","402f3b69476f44da7dfc58196ae17593eafa89c5f8":"checkCode"},"",""] */ __turbopack_context__.s({
    "awaitDoorClose": (()=>awaitDoorClose),
    "checkCode": (()=>checkCode),
    "finishSession": (()=>finishSession),
    "forceResetState": (()=>forceResetState),
    "startCleaningCycle": (()=>startCleaningCycle),
    "stopCleaningCycle": (()=>stopCleaningCycle),
    "unlockDoorAndAwaitOpen": (()=>unlockDoorAndAwaitOpen)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$app$2d$render$2f$encryption$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/app-render/encryption.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$storage$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/storage.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$twilio$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/twilio/lib/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
function getHaConfig() {
    // VIETTURIS: Lūdzu, aizstājiet šīs vērtības ar savām, ja nepieciešams!
    const HA_URL = "http://192.168.8.120:8123";
    const HA_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjMTE4MjQwNjdlYTc0NWI5YTllOGFmMjcxNDViNWQwOSIsImlhdCI6MTc1NTc3NDk4NiwiZXhwIjoyMDcxMTM0OTg2fQ.tKjaJlcFP6TQteVXKV9YUIy5lY0UXR8Od5FSv-D-USo";
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    }
    return {
        haUrl: HA_URL,
        haToken: HA_TOKEN
    };
}
function getTwilioConfig() {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioPhone = process.env.TWILIO_PHONE_NUMBER;
    if (!accountSid || !authToken || !twilioPhone) {
        console.warn("Twilio environment variables (TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER) are not set. SMS notifications will be simulated.");
        return {
            configured: false,
            client: null,
            twilioPhone: null
        };
    }
    const client = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$twilio$2f$lib$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])(accountSid, authToken);
    return {
        configured: true,
        client,
        twilioPhone
    };
}
const LOCK_ENTITY_ID = 'switch.sonoff_1000e6fcb0_1';
const DOOR_SENSOR_ENTITY_ID = 'binary_sensor.1_durvis_durvis';
const HEAT_ENTITY_ID = 'switch.sonoff_1000e6fcb0_4';
const UV_ENTITY_ID = 'switch.sonoff_1000e6fcb0_3';
const FANS_ENTITY_ID = 'switch.sonoff_1000e6fcb0_2';
const MOTOR_ENTITY_ID = 'switch.sonoff_1000f85860';
const BACKUP_CODE = '111111';
const CLEANING_CYCLE_DURATION_MS = 14 * 60 * 1000; // 14 minutes
const VENTILATION_CYCLE_DURATION_MS = 1 * 60 * 1000; // 1 minute
async function callService(domain, service, serviceData) {
    const { haUrl, haToken } = getHaConfig();
    const response = await fetch(`${haUrl}/api/services/${domain}/${service}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${haToken}`,
            'Content-Type': 'application/json'
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
async function getEntityState(entityId) {
    const { haUrl, haToken } = getHaConfig();
    const response = await fetch(`${haUrl}/api/states/${entityId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${haToken}`,
            'Content-Type': 'application/json'
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
async function turnOnSwitch(entityId) {
    return callService('switch', 'turn_on', {
        entity_id: entityId
    });
}
async function turnOffSwitch(entityId) {
    return callService('switch', 'turn_off', {
        entity_id: entityId
    });
}
async function pollDoorState(targetState, timeout = 30000, interval = 500) {
    const startTime = Date.now();
    while(Date.now() - startTime < timeout){
        const doorState = await getEntityState(DOOR_SENSOR_ENTITY_ID);
        if (doorState.state === targetState) {
            return;
        }
        await new Promise((resolve)=>setTimeout(resolve, interval));
    }
    throw new Error(`Laika limits (30s) pārsniegts, gaidot durvju stāvokli: '${targetState}'.`);
}
async function unlockDoorAndAwaitOpen() {
    await turnOnSwitch(LOCK_ENTITY_ID);
    try {
        // Poll for door open status
        await pollDoorState('on'); // 'on' usually means open for binary_sensor
    } finally{
        // Always turn off the switch after the process
        await turnOffSwitch(LOCK_ENTITY_ID);
    }
}
async function awaitDoorClose() {
    // Poll for door close status
    await pollDoorState('off'); // 'off' usually means closed
}
async function sendSmsMessage(to, message) {
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
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$storage$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getActiveSession"])();
    if (session) {
        const message = `Jūsu apavi ir gatavi izņemšanai. Kods, lai atvērtu durtiņas - ${session.code}`;
        await sendSmsMessage(session.phone, message);
    }
}
async function stopCleaningCycle() {
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
        setTimeout(async ()=>{
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
async function startCleaningCycle() {
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
async function checkCode(code) {
    if (code === BACKUP_CODE) {
        console.log("Backup code used.");
        return true;
    }
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$storage$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getActiveSession"])();
    if (session && session.code === code) {
        return true;
    }
    return false;
}
async function finishSession() {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$storage$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clearActiveSession"])();
    console.log("Sesija pabeigta, numurs un kods izdzēsti.");
}
async function forceResetState() {
    console.warn("Piespiedu atiestatīšana sākta...");
    try {
        await Promise.allSettled([
            turnOffSwitch(LOCK_ENTITY_ID),
            turnOffSwitch(HEAT_ENTITY_ID),
            turnOffSwitch(UV_ENTITY_ID),
            turnOffSwitch(FANS_ENTITY_ID),
            turnOffSwitch(MOTOR_ENTITY_ID)
        ]);
        console.log("Visi slēdži ir izslēgti.");
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$storage$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clearActiveSession"])();
        console.log("Iesprūdusī sesija notīrīta. Sistēma atiestatīta.");
    } catch (error) {
        console.error("Kļūda, veicot piespiedu atiestatīšanu:", error);
        // Even if there's an error, try to clear the session
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$storage$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clearActiveSession"])().catch((e)=>console.error("Neizdevās notīrīt sesiju pēc atiestatīšanas kļūdas:", e));
        throw new Error("Kļūda, veicot atiestatīšanu. Pārbaudiet konsoli.");
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    unlockDoorAndAwaitOpen,
    awaitDoorClose,
    stopCleaningCycle,
    startCleaningCycle,
    checkCode,
    finishSession,
    forceResetState
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(unlockDoorAndAwaitOpen, "008df63600d91d9a8264378ee15ef35eabaca97cb7", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(awaitDoorClose, "00c3337b8c2cac0f6c3b58dc213e2b378176a07227", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(stopCleaningCycle, "00027fe208bf50e5661920fb5dc11c0a41340fb25f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(startCleaningCycle, "00ff896f99e7593a911e9a4d76d3e311940c7a0e65", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(checkCode, "402f3b69476f44da7dfc58196ae17593eafa89c5f8", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(finishSession, "008fffe3e34bf53ce2c670697b947f58dcf79d32bf", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(forceResetState, "00a044523e88c7e353cac9adc9b30c6a06e0a80440", null);
}}),
"[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/services/storage.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/src/services/home-assistant.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$storage$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/storage.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$home$2d$assistant$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/home-assistant.ts [app-rsc] (ecmascript)");
;
;
;
;
;
}}),
"[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/services/storage.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/src/services/home-assistant.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$storage$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/storage.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$home$2d$assistant$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/home-assistant.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$services$2f$storage$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$src$2f$services$2f$home$2d$assistant$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => "[project]/src/services/storage.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/src/services/home-assistant.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
}}),
"[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/services/storage.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/src/services/home-assistant.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <exports>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "000d00a7e5ee24027cbe0eb5814f088db3497c2a5a": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$storage$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getActiveSession"]),
    "008df63600d91d9a8264378ee15ef35eabaca97cb7": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$home$2d$assistant$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["unlockDoorAndAwaitOpen"]),
    "008fffe3e34bf53ce2c670697b947f58dcf79d32bf": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$home$2d$assistant$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["finishSession"]),
    "00a044523e88c7e353cac9adc9b30c6a06e0a80440": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$home$2d$assistant$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["forceResetState"]),
    "402f3b69476f44da7dfc58196ae17593eafa89c5f8": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$home$2d$assistant$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["checkCode"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$storage$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/storage.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$home$2d$assistant$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/home-assistant.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$services$2f$storage$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$src$2f$services$2f$home$2d$assistant$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => "[project]/src/services/storage.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/src/services/home-assistant.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
}}),
"[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/services/storage.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/src/services/home-assistant.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "000d00a7e5ee24027cbe0eb5814f088db3497c2a5a": (()=>__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$services$2f$storage$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$src$2f$services$2f$home$2d$assistant$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__["000d00a7e5ee24027cbe0eb5814f088db3497c2a5a"]),
    "008df63600d91d9a8264378ee15ef35eabaca97cb7": (()=>__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$services$2f$storage$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$src$2f$services$2f$home$2d$assistant$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__["008df63600d91d9a8264378ee15ef35eabaca97cb7"]),
    "008fffe3e34bf53ce2c670697b947f58dcf79d32bf": (()=>__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$services$2f$storage$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$src$2f$services$2f$home$2d$assistant$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__["008fffe3e34bf53ce2c670697b947f58dcf79d32bf"]),
    "00a044523e88c7e353cac9adc9b30c6a06e0a80440": (()=>__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$services$2f$storage$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$src$2f$services$2f$home$2d$assistant$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__["00a044523e88c7e353cac9adc9b30c6a06e0a80440"]),
    "402f3b69476f44da7dfc58196ae17593eafa89c5f8": (()=>__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$services$2f$storage$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$src$2f$services$2f$home$2d$assistant$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__["402f3b69476f44da7dfc58196ae17593eafa89c5f8"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$services$2f$storage$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$src$2f$services$2f$home$2d$assistant$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => "[project]/src/services/storage.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/src/services/home-assistant.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <module evaluation>');
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$services$2f$storage$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$src$2f$services$2f$home$2d$assistant$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => "[project]/src/services/storage.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/src/services/home-assistant.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <exports>');
}}),
"[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript)"));
}}),
"[project]/src/app/layout.tsx [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/layout.tsx [app-rsc] (ecmascript)"));
}}),
"[project]/src/app/page.tsx (client reference/proxy) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/app/page.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/app/page.tsx <module evaluation>", "default");
}}),
"[project]/src/app/page.tsx (client reference/proxy)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server-edge.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2d$edge$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/app/page.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/app/page.tsx", "default");
}}),
"[project]/src/app/page.tsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$tsx__$28$client__reference$2f$proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/app/page.tsx (client reference/proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$tsx__$28$client__reference$2f$proxy$29$__ = __turbopack_context__.i("[project]/src/app/page.tsx (client reference/proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$tsx__$28$client__reference$2f$proxy$29$__);
}}),
"[project]/src/app/page.tsx [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/page.tsx [app-rsc] (ecmascript)"));
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__45d6d513._.js.map