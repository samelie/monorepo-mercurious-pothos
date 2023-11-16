import { readFileSync, statSync } from "node:fs";
import { join, parse } from "node:path";

import { execSync } from "../utils";
import type { PesslConfig } from "./types";

/** Location of the package.json responsible for bundling the application. This can be different from the rootDir in a monorepo.  */
export function getProjectDir() {
    const projectDir = process.env.PROJECT_DIR || process.env.CWD || process.cwd();
    if (!statSync(projectDir).isDirectory()) {
        console.warn(
            `[Config] process.env.PROJECT_DIR is not a directory, falling back to closest directory. This should be where your app's package.json is.`,
        );
        return parse(projectDir).dir;
    }
    return projectDir;
}

/**
 * @param  {PesslConfig} pesslConfig
 * @returns - number or undefined port value
 */
export function getDevPort(pesslConfig: PesslConfig) {
    const port =
        process.env.PORT !== undefined && process.env.PORT.length
            ? Number.parseInt(process.env.PORT, 10)
            : pesslConfig.app?.dev.port;
    if (Number.isNaN(port)) return undefined;
    if (port === 0) throw new Error(`Cannot have a devPort of 0`);
    return port;
}

interface TargetUpstreamOpts {
    pkgRootDir: string;
    removeProtocol?: boolean;
}

export function getHasSourcemap(pesslConfig: PesslConfig) {
    if (pesslConfig?.app?.prod?.sourcemaps === false) {
        return false;
    }

    return !process.env.SOURCEMAP || process.env.SOURCEMAP !== "0";
}
