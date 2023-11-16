import fs from "node:fs";
import { join } from "node:path";

import type { Plugin } from "vite";

/**
 * Prod only plugin for apps.
 * By default vite will prefix all paths in `index.html` with the `base` option.
 * However, base-image assets are copied to the root dir of the web path.
 * So, we cannot rely on the `base` setting in vite.config for their location.
 * This plugin removes vite's auto adding of the prefix and changes to these assets:
 * "/app/some-file.ext" to "/some-file.ext"
 */
export function indexHtml(rootDir: string, base: string): Plugin {
    return {
        name: "pessl:configure-index-html",
        transformIndexHtml(html) {
            const baseImageDir = join(rootDir, "build", "base-image");
            if (!fs.existsSync(baseImageDir)) return html;
            const files = fs.readdirSync(baseImageDir);
            return files.reduce((memo, val) => {
                return memo.replace(`href="${base}${val}"`, `href="/${val}"`);
            }, html);
        },
    };
}
