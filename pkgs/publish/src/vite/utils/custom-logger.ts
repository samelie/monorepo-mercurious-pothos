import type { Logger } from "vite";

import { DEV_PROXY_PORT, devPort } from "../../config/constants";

export function getCustomLogger(): Logger {
    return {
        error(msg) {
            console.error(msg);
        },
        warn() { },
        warnOnce() { },
        clearScreen() { },
        hasErrorLogged() {
            return true;
        },
        hasWarned: false,
        info(msg) {
            console.log(msg)
            // console.log(msg.replace(String(devPort), String(DEV_PROXY_PORT)));
        },
    };
}
