import type { Plugin } from "vite";
import UnoCSS from 'unocss/vite'
import { join } from "path";
import { pkgRootDir } from "../utils/constants";

interface SourcemapExclude {
  excludeNodeModules?: boolean;
}
export function unocssPlugin(opts?: SourcemapExclude) {
  return UnoCSS(join(pkgRootDir, './uno.config.ts'))
}
