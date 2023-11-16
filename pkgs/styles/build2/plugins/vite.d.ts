import type { Plugin } from "vite";
interface SourcemapExclude {
    excludeNodeModules?: boolean;
}
export declare function unocssPlugin(opts?: SourcemapExclude): Plugin[];
export {};
