import { basename, resolve } from "node:path";

import type { UserConfig } from "vite";
import { defineConfig, mergeConfig } from "vite";

import { projectDir, rootDir } from "../../config/constants";
import { createBaseConfig } from "./base.config";
import { getRollupOptions } from "./rollup";

/**
 * Build pkg as library
 */
export function definePkgConfig(configOverrides: UserConfig = {}) {
    const pkgDir = basename(projectDir);
    const packageJsonPath = resolve(projectDir, "package.json");
    return defineConfig(configEnv =>
        mergeConfig(
            mergeConfig(createBaseConfig()(configEnv), {
                root: rootDir,
                build: {
                    rollupOptions: getRollupOptions({ packageJsonPath }),
                    // Docs -https://vitejs.dev/guide/build.html#library-mode
                    lib: {
                        entry: resolve(projectDir, "src/index.ts"),
                        name: pkgDir,
                        fileName: "main",
                        formats: ["es", "cjs"],
                    },
                },
            } satisfies UserConfig),
            configOverrides,
        ),
    );
}
