import history from "connect-history-api-fallback";
import type { ViteDevServer } from "vite";

/**
 * Dev only plugin for apps.
 *
 * Copies the logic from https://github.com/ivesia/vite-plugin-rewrite-all/blob/master/src/index.ts
 *
 * connect-history-api-fallback -- We're installing the same version as Vite ( https://github.com/vitejs/vite/blob/e674f85d50f6b418a52e3e0807162cc8210c0dfd/packages/vite/package.json#L94 )
 *
 * Related issues and PRs:
 * - https://github.com/vitejs/vite/issues/2415
 * - https://github.com/vitejs/vite/pull/2634/files#
 */
export function dotRuleFix() {
    return {
        name: "pessl:dot-rule-fix",
        configureServer(server: ViteDevServer) {
            return () => {
                const handler = history({
                    disableDotRule: true,
                    rewrites: [{ from: /\/$/, to: () => "/index.html" }],
                });

                server.middlewares.use((req, res, next) => {
                    handler(req as Parameters<typeof handler>[0], res as Parameters<typeof handler>[1], next);
                });
            };
        },
    };
}
