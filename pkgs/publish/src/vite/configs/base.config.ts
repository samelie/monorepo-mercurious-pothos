import fs from 'node:fs'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'

import type { UserConfigExport, UserConfigFn } from 'vite'
import { defineConfig } from 'vite'

import {
  hasSourcemap,
  isRunningFromSource,
  outDir,
  sslCertPath,
  sslKeyPath,
} from '../../config/constants'
import { getAliases } from './aliases'

export const createBaseConfig = () => {
  return defineConfig((() => {
    // May want to disable source maps for testing local dev builds
    return {
      plugins: [],
      // A dependency might check for properties on process.env
      // If an env var is required for a dependency, add it here.
      define: {
        'process.env.NODE_DEBUG': process.env.NODE_DEBUG,
      },
      // https://vitejs.dev/config/shared-options.html#resolve-conditions
      // This tells vite to look for the entrypoint here. Allows pkg to publish the correct fields.conditions: ["vite"],
      //  If we're compiling from source we use .ts and to consume these pkgs outside repo
      resolve: {
        conditions: isRunningFromSource ? ['vite'] : undefined,
        alias: [
          {
            find: 'url',
            replacement: 'rollup-plugin-node-polyfills/polyfills/url',
          },
          {
            find: 'node:url',
            replacement: 'rollup-plugin-node-polyfills/polyfills/url',
          },
          {
            find: 'path',
            replacement:
              'rollup-plugin-node-polyfills/polyfills/path',
          },
          {
            find: 'node:path',
            replacement:
              'rollup-plugin-node-polyfills/polyfills/path',
          },
          {
            find: 'module',
            replacement:
              'rollup-plugin-node-polyfills/polyfills/module',
          },
        ],
      },
      optimizeDeps: {
        esbuildOptions: {
          plugins: [
            // NodeModulesPolyfillPlugin(),
            // NodeGlobalsPolyfillPlugin(),
          ],
        },
      },
      build: {
        sourcemap: hasSourcemap,
        outDir,
      },
      server: {
        fs: {
          // When needing to load a module for development outside of
          // the root.
          strict: false,
        },
        https: {
          key: fs.readFileSync(sslKeyPath, 'utf-8'),
          cert: fs.readFileSync(sslCertPath, 'utf-8'),
        },
      },
      css: {
        preprocessorOptions: {
          scss: {
            /**
             * Dart v2 will introduce a breaking change on the maths
             * This quiets the deprecation warnings for now. b/c blueprintjs of course :facepalm:
             * See for more details:
             * Docs - https://sass-lang.com/documentation/breaking-changes/slash-div
             * GH -   https://github.com/sass/sass/issues/3065
             */
            quietDeps: true,
          },
        },
      },
    }
  }) as UserConfigExport) as UserConfigFn
}
