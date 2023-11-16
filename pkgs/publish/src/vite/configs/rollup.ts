import { readFileSync } from "node:fs";

import { compact } from "lodash-es";
import type { RollupOptions } from "rollup";

import { getDevAndPeerDeps } from "../plugins/utils";
import { PackageJson } from "../plugins/types";

/*
This whole file is to maintain a list of deps we support chunking, but DONT want to have as deps to this pkg
*/

const depNames = {
    "@blueprintjs/core": "blueprint",
    "mapbox-gl": "mapboxgl",
    "react-dom": "react-dom",
    three: "three",
    "lodash-es": "lodashes",
    lodash: "lodash",
} as const;

type Deps = keyof typeof depNames;
type DepNames = (typeof depNames)[Deps];

function makeVerifyChunk(pkgJson: PackageJson) {
    return function (dep: Deps) {
        // so we dont grab deps=of-deps
        if (!pkgJson.dependencies[dep]) return undefined;
        try {
            require.resolve(dep);
        } catch (e) {
            return undefined;
        }
        return [depNames[dep], dep] as [DepNames, Deps];
    };
}

function getChunk(pkgJson: PackageJson, dep: Deps[], key: DepNames): Record<DepNames, Deps[]>;
function getChunk(pkgJson: PackageJson, dep: Deps, key?: DepNames): Record<DepNames, Deps[]>;
function getChunk(pkgJson: PackageJson, dep: Deps | Deps[], key?: DepNames) {
    const verifyChunk = makeVerifyChunk(pkgJson);
    if (Array.isArray(dep)) {
        if (!key) throw new Error("Needs a key");
        return {
            [key]: compact(dep.map(verifyChunk)).map(([, d]) => d),
        } as Record<DepNames, Deps[]>;
    }
    const chunk = verifyChunk(dep);
    if (!chunk) return {};
    return {
        [chunk[0]]: [chunk[1]],
    };
}

/**
 * Output
 * ```
 * {
  blueprint: [ '@blueprintjs/core' ],
  mapboxgl: [ 'mapbox-gl' ],
  reactdom: [ 'react-dom' ],
  three: [ 'three' ],
  lodash: [ 'lodash', 'lodash-es' ]
}
```
 */
export function getManualChunks(pkgJson: PackageJson) {
    return {
        ...getChunk(pkgJson, "@blueprintjs/core"),
        ...getChunk(pkgJson, "mapbox-gl"),
        ...getChunk(pkgJson, "react-dom"),
        ...getChunk(pkgJson, "three"),
        ...getChunk(pkgJson, ["lodash", "lodash-es"], "lodash"),
    };
}

export function getPkgJsonDeps(pkgJson: PackageJson, name: string, dep: string) {
    return {
        ...(pkgJson.dependencies[dep] && { [name]: [dep] }),
    };
}

interface GetRollupOptionsOpts {
    packageJsonPath: string;
}

/*
 *  These have specific mappings.
 *  // Docs -https://vitejs.dev/guide/build.html#library-mode
 */
const globalMapping = {
    react: "React",
    "react-dom": "ReactDOM",
} as const;

export function getRollupOptions(opts: GetRollupOptionsOpts): RollupOptions {
    const pkgJson = JSON.parse(readFileSync(opts.packageJsonPath, "utf-8")) as PackageJson;

    // the dep name becomes the global name. Special mappings for some.
    const external = getDevAndPeerDeps(pkgJson).map(dep => [dep, globalMapping[dep] || dep]);

    return {
        external: external.map(([dep]) => dep),
        output: {
            globals: Object.fromEntries(external),
        },
    };
}
