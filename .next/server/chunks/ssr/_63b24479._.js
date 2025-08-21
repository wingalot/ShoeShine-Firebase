module.exports = {

"[project]/src/services/home-assistant.ts [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/* __next_internal_action_entry_do_not_use__ [{"00027fe208bf50e5661920fb5dc11c0a41340fb25f":"stopCleaningCycle","008df63600d91d9a8264378ee15ef35eabaca97cb7":"unlockDoorAndAwaitOpen","00c3337b8c2cac0f6c3b58dc213e2b378176a07227":"awaitDoorClose","00ff896f99e7593a911e9a4d76d3e311940c7a0e65":"startCleaningCycle"},"",""] */ __turbopack_context__.s({
    "awaitDoorClose": (()=>awaitDoorClose),
    "startCleaningCycle": (()=>startCleaningCycle),
    "stopCleaningCycle": (()=>stopCleaningCycle),
    "unlockDoorAndAwaitOpen": (()=>unlockDoorAndAwaitOpen)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$app$2d$render$2f$encryption$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/app-render/encryption.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
function getHaConfig() {
    // VIETTURIS: Lūdzu, aizstājiet šīs vērtības ar savām, ja nepieciešams!
    const HA_URL = "http://192.168.1.101:8123";
    const HA_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjMTE4MjQwNjdlYTc0NWI5YTllOGFmMjcxNDViNWQwOSIsImlhdCI6MTc1NTc3NDk4NiwiZXhwIjoyMDcxMTM0OTg2fQ.tKjaJlcFP6TQteVXKV9YUIy5lY0UXR8Od5FSv-D-USo";
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    }
    return {
        haUrl: HA_URL,
        haToken: HA_TOKEN
    };
}
const LOCK_ENTITY_ID = 'switch.sonoff_1000e6fcb0_1';
const DOOR_SENSOR_ENTITY_ID = 'binary_sensor.1_durvis_durvis';
const HEAT_ENTITY_ID = 'switch.sonoff_1000e6fcb0_4';
const UV_ENTITY_ID = 'switch.sonoff_1000e6fcb0_3';
const FANS_ENTITY_ID = 'switch.sonoff_1000e6fcb0_2';
const MOTOR_ENTITY_ID = 'switch.sonoff_1000f85860';
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
        // Schedule motor to turn off
        setTimeout(async ()=>{
            try {
                await turnOffSwitch(MOTOR_ENTITY_ID);
                console.log("Vēdināšanas cikls beidzies, motors izslēgts.");
            } catch (error) {
                console.error("Kļūda, izslēdzot motoru:", error);
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
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    unlockDoorAndAwaitOpen,
    awaitDoorClose,
    stopCleaningCycle,
    startCleaningCycle
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(unlockDoorAndAwaitOpen, "008df63600d91d9a8264378ee15ef35eabaca97cb7", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(awaitDoorClose, "00c3337b8c2cac0f6c3b58dc213e2b378176a07227", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(stopCleaningCycle, "00027fe208bf50e5661920fb5dc11c0a41340fb25f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(startCleaningCycle, "00ff896f99e7593a911e9a4d76d3e311940c7a0e65", null);
}}),
"[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/services/home-assistant.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$home$2d$assistant$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/home-assistant.ts [app-rsc] (ecmascript)");
;
}}),
"[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/services/home-assistant.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$home$2d$assistant$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/home-assistant.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$services$2f$home$2d$assistant$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => "[project]/src/services/home-assistant.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
}}),
"[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/services/home-assistant.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <exports>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "008df63600d91d9a8264378ee15ef35eabaca97cb7": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$home$2d$assistant$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["unlockDoorAndAwaitOpen"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$home$2d$assistant$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/home-assistant.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$services$2f$home$2d$assistant$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => "[project]/src/services/home-assistant.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
}}),
"[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/services/home-assistant.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "008df63600d91d9a8264378ee15ef35eabaca97cb7": (()=>__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$services$2f$home$2d$assistant$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__["008df63600d91d9a8264378ee15ef35eabaca97cb7"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$services$2f$home$2d$assistant$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => "[project]/src/services/home-assistant.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <module evaluation>');
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$services$2f$home$2d$assistant$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$exports$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => "[project]/src/services/home-assistant.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <exports>');
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

//# sourceMappingURL=_63b24479._.js.map