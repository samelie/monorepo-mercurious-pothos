import type { LogLevel, ViteMode } from "./types";

// NODE_ENV can be flakey and overwritten
const A_MODE = process.env.A_MODE as ViteMode;
const A_LOG_LEVEL = process.env.A_LOG_LEVEL as LogLevel;
const NODE_ENV = A_MODE || process.env.NODE_ENV;
export const isPreview = process.env.PREVIEW === "1" || NODE_ENV === "preview";
export const isDev = NODE_ENV === "dev" || NODE_ENV === "development";
export const isProd = NODE_ENV === "production";
export const isVitest = process.env.VITEST === "true";
export const logLevel = A_LOG_LEVEL;
