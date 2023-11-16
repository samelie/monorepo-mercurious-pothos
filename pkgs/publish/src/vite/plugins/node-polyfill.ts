import type { Plugin } from 'vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export function nodePolyfill(): Plugin {
  return nodePolyfills({
    // To exclude specific polyfills, add them to this list.
    exclude: [
      'fs', // Excludes the polyfill for `fs` and `node:fs`.
    ],
    // Whether to polyfill `node:` protocol imports.
    protocolImports: true,
  })
}
