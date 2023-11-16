import { uniq } from "lodash-es";

import type { PackageJson } from "./types";

/**
 * Wrap `console` so we can prefix it with plugin name
 */
export const pluginLog = (
    type: "info" | "error" | "warn",
    name: "dev-authenticator",
    message: string,
    ...args: any[]
) => console[type].apply(console[type], [`[pessl:${name}] ${message}`, ...args]);

export function getDevAndPeerDeps(pkgJson: PackageJson) {
    const { devDependencies, peerDependencies } = pkgJson || {};
    return uniq([...Object.keys(peerDependencies || {}), ...Object.keys(devDependencies || {})]);
}
