// import '@you/env'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { cpus } from 'os'
import type { UserConfig, UserConfigExport } from 'vite'
import { defineConfig, mergeConfig } from 'vite'

import {
  devPort,
  pesslConfig,
  projectDir,
  rootDir,
} from '../../config/constants'
import { isDev, isPreview } from '../../config/envvars'
import { getCustomLogger } from '../utils/custom-logger'
import type { PackageJson } from '../plugins/types'
import { createBaseConfig } from './base.config'
import { getPlugins } from './plugins'
import { getManualChunks, getPkgJsonDeps } from './rollup'

/**
 * Define vite.config to be used for "apps"
 */

export function defineAppConfig(
  configOverrides: UserConfig = {},
): UserConfigExport {
  console.info(
    `[Config] Using ${projectDir} as your project directory.`,
  )
  console.info(`[Config] Using ${rootDir} as the repo root.`)
  const port = devPort || configOverrides.server?.port
  const pkg = JSON.parse(
    readFileSync(resolve(projectDir, 'package.json'), 'utf-8'),
  ) as PackageJson
  // when invoked on root, there are no dependencies and thus need to ensure it exists
  const pkgJson = { ...pkg, dependencies: pkg.dependencies ?? {} }
  const base = pkgJson.homepage || configOverrides.base || ''
  const disableSourcemapExplorer =
    pesslConfig.app?.prod?.disableSourcemapExplorer ?? false
  if ((isDev || isPreview) && (!port || isNaN(port))) {
    throw new Error(
      `port is missing. Use either process.env.PORT or server.port`,
    )
  }

  const plugins = getPlugins(pkgJson, {
    base,
    disableSourcemapExplorer,
    plugins: pesslConfig.app?.plugins,
  })

  return defineConfig((configEnv) => {
    const baseConfig = createBaseConfig()
    const appConfig = mergeConfig(baseConfig(configEnv), {
      root: rootDir,
      logLevel: 'info',
      customLogger: getCustomLogger(),
      base,
      plugins,
      server: {
        port,
        hmr: { overlay: false },
      },
      preview: {
        port,
      },
      build: {
        rollupOptions: {
          cache: process.env.CI ? false : undefined,
          // Based on https://github.com/vitejs/vite/issues/2433#issuecomment-1422127051
          // helps reduce memory usage in CI which was OOM-ing (default value is 20)
          maxParallelFileOps: Math.max(1, cpus().length - 1),
          output: {
            // https://rollupjs.org/guide/en/#outputmanualchunks
            manualChunks: {
              ...getManualChunks(pkgJson),
            },
          },
        },
      },
    } satisfies UserConfig)
    const resolvedConfig = mergeConfig(appConfig, configOverrides)
    return resolvedConfig
  })
}
