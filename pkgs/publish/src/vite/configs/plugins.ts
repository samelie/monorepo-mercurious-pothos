import { basename, resolve } from 'node:path'

import visualizer from 'rollup-plugin-visualizer'
import type { PluginOption } from 'vite'

import { unocssPlugin } from '@you/styles'
import { projectDir, rootDir } from '../../config/constants'
import { isProd } from '../../config/envvars'
import { sourcemapExclude } from '../plugins/sourcemap-exclude'

import type { PluginIds } from '../../config/types'
import { dotRuleFix } from '../plugins/dot-rule-fix'
import { indexHtml } from '../plugins/index-html'
import type { PackageJson } from '../plugins/types'
import { nodePolyfill } from '../plugins/node-polyfill'
import { pslEnv } from '../plugins/env'

type PluginConfigOpts = {
  base: string
  plugins?: PluginIds[]
  disableSourcemapExplorer: boolean
}

const devOnly = ({}: PluginConfigOpts) => {
  return [dotRuleFix()]
}

const prodOnly = ({
  base,
  appDirName,
  disableSourcemapExplorer,
}: PluginConfigOpts & { appDirName: string }) => {
  const plugins: PluginOption = [
    indexHtml(rootDir, base),
    sourcemapExclude({ excludeNodeModules: true }),
  ]
  if (!disableSourcemapExplorer) {
    const vis = visualizer({
      filename: resolve(
        rootDir,
        'public/source-map-explorer',
        `${appDirName}.html`,
      ),
      template: 'treemap',
      gzipSize: true,
    }) as unknown as PluginOption

    plugins.splice(1, 0, vis)
  }

  return plugins
}

export const getStaticAssetPlugins = (pkgJson: PackageJson) => {
  const plugins: PluginOption = []
  console.info('[Plugin] Checking for eligible plugins...')

  return plugins
}

export const getPlugins = (
  pkgJson: PackageJson,
  opts: PluginConfigOpts,
) => {
  const { base } = opts
  const appDirName = basename(projectDir)
  const plugins: PluginOption = getStaticAssetPlugins(pkgJson)

  if (isProd) {
    return [...plugins, ...prodOnly({ ...opts, appDirName })]
  }

  if (opts.plugins?.includes('unocss')) {
    plugins.push(unocssPlugin())
  }

  plugins.push(pslEnv())

  return [...plugins, ...devOnly(opts)]
}
