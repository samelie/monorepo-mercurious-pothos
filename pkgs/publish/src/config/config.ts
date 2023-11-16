import { join } from 'node:path'

import type { Loader } from 'cosmiconfig'
import { cosmiconfigSync } from 'cosmiconfig'
import { randomUUID } from 'crypto'
import { buildSync } from 'esbuild'
import { tmpdir } from 'os'

import { logLevel } from './envvars'
import type { PesslConfig } from './types'

const moduleName = 'pessl'

const getSearchPlaces = (mn: string) => [`${mn}.config.ts`]

// lifted the idea from https://github1s.com/Codex-/cosmiconfig-typescript-loader/blob/HEAD/lib/loader.ts
//  ts-node is super annoying to have as a dep. We're using esbuild and tsx
function TypeScriptLoader(): Loader {
  return (path: string) => {
    const outfile = join(tmpdir(), `${randomUUID()}-config.js`)
    buildSync({
      entryPoints: [path],
      format: 'esm',
      outfile,
    })

    // it would be great it we had top-level import for syncronous loading of esm modules.
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const result = require(outfile)
    return result.default || result
  }
}

const configExplorer = cosmiconfigSync(moduleName, {
  // supports all these formats.
  searchPlaces: [
    ...getSearchPlaces(moduleName),
    ...getSearchPlaces(`.config/${moduleName}`),
    'package.json',
  ],
  packageProp: moduleName,
  loaders: {
    '.ts': TypeScriptLoader(),
  },
})

interface LoadConfigOptions {
  /** Cosmiconfig option   */
  noCache?: boolean
  quiet?: boolean
}
export function getPesslConfig(
  rootDir: string,
  opts?: LoadConfigOptions,
): PesslConfig {
  if (opts?.noCache === true) {
    configExplorer.clearCaches()
  }
  const canLog = logLevel !== 'silent' && !opts?.quiet
  const config = configExplorer.search(rootDir)
  if (config?.config === undefined && canLog) {
    return {}
  }
  if (canLog) {
    console.info(`[Config] loaded pessl.config from ${rootDir}`)
  }
  if (!config?.config) return {}
  return config.config
}
