// related: https://vitejs.dev/guide/env-and-mode.html#env-variables-and-modes & what we set
export type LogLevel = "" | undefined | "silent";
export type ViteMode = "" | undefined | "preview" | "dev" | "production" | "development";
export type PluginIds = 'unocss'
export type PesslConfig = {
    app?: {
        plugins: PluginIds[]
        dev: {
            port: number;
        };
        prod?: {
            sourcemaps?: boolean;
            disableSourcemapExplorer?: boolean;
        };
    };
};
