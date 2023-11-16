import { join } from "node:path";

import { defineConfig, mergeConfig } from "vite";
import type { InlineConfig } from "vitest";

import { rootDir } from "../../config/constants";
import { createBaseConfig } from "./base.config";

/**
 * Vitest config
 * Only relies on the base config
 */
export default defineConfig(configEnv => {
    const baseConfig = createBaseConfig();
    return mergeConfig(baseConfig(configEnv), {
        resolve: {
            // https://vitejs.dev/config/shared-options.html#resolve-conditions
            // This tells vitest to look for the entrypoint here. Allows pkg to publish the correct fields.
            conditions: ["vite"],
        },
        test: {
            alias: [
                {
                    find: /@pessl\/cesium-martini$/,
                    replacement: "",
                    customResolver: () => join(rootDir, "tests/mocks/macrostrat-cesium-martini.ts"),
                },
                {
                    find: /react-dnd|react-dnd-html5-backend/,
                    replacement: "",
                    customResolver: () => join(rootDir, "tests/mocks/react-dnd.ts"),
                },
                {
                    find: /@improbable-eng\/grpc-web|@improbable-eng\/grpc-web-node-http-transport/,
                    replacement: "",
                    customResolver: () => join(rootDir, "tests/mocks/grpc-web.ts"),
                },
                {
                    find: /\.(jpg|jpeg|png|gif|eot|otf|pdf|kml|kmz|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|glsl)$/,
                    replacement: "",
                    customResolver: () => join(rootDir, "tests/mocks/file.js"),
                },
                {
                    find: /\.svg$/,
                    replacement: "",
                    customResolver: () => join(rootDir, "tests/mocks/svg-component.js"),
                },
                {
                    find: /\.s?css$/,
                    replacement: "",
                    customResolver: () => join(rootDir, "tests/mocks/css.js"),
                },
                {
                    find: /\.worker\?worker$/,
                    replacement: "",
                    customResolver: () => join(rootDir, "tests/mocks/worker.js"),
                },
                {
                    find: /coordinator$/,
                    replacement: "",
                    customResolver: () => join(rootDir, "tests/mocks/noop.ts"),
                },
                {
                    find: /popper\.js$/,
                    replacement: "",
                    customResolver: () => join(rootDir, "tests/mocks/noop.ts"),
                },
                {
                    find: /mapbox-gl$/,
                    replacement: "",
                    customResolver: () => join(rootDir, "tests/mocks/mapbox-gl.ts"),
                },
                {
                    find: /^@pessl\/(shared-settings)$/,
                    replacement: join(rootDir, "pkgs/$1/src/index.ts"),
                },
            ],
            css: false,
            reporters: ["verbose"],
            watch: true,
            minThreads: 16,
            maxThreads: 32,
            cache: false,
            coverage: { reportsDirectory: "public/coverage", reporter: ["html"] },
            clearMocks: true,
            restoreMocks: true,
            mockReset: true,
            passWithNoTests: true,
            forceRerunTriggers: ["apps/**/*", "pkgs/**/*"],
            isolate: true,
            globals: true,
            setupFiles: [join(rootDir, "tests/setupVitest.ts")],
            include: ["{apps,pkgs}/**/*.test.{js,ts,tsx}"],
            exclude: [
                "**/node_modules/**",
                "**/dist/**",
                "**/cypress/**",
                "**/.{idea,git,cache,output,temp}/**",
                "**/build/**",
                "**/public/**",
            ],
            environment: "jsdom",
        } satisfies InlineConfig,
    });
});
