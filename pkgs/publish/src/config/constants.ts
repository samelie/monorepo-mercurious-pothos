import { parse, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

/*
When this pkg is installed a dep, we need to find it's root_pkg_dir.
That way the compiled code knows where to look for static files.
*/
import { sync as pkgUpSync } from 'pkg-up'

// import { getPesslConfig } from "./config";
import { getDevPort, getHasSourcemap, getProjectDir } from './utils'
import { PesslConfig } from './types'

const dirname = parse(fileURLToPath(import.meta.url)).dir
/**
 * Specifies the output directory (relative to project root).
 * Vite build config - https://vitejs.dev/config/build-options.html#build-outdir
 */
export const outDir = 'build'

/** Location of the consumers package.json  */

export const projectDir = getProjectDir()
// export const pesslConfig = getPesslConfig(projectDir);
export const pesslConfig = {
  app: {
    plugins: ['unocss'],
    dev: {
      port: 5173,
    },
  },
} as PesslConfig

/** Root dir could mean the root of monorepo. If so, ROOT_DIR should be specified.  */
export const rootDir = process.env.ROOT_DIR || projectDir
/**
 * If this pkg is used from source, PKG_DIR is expected to supply the dir of this pkg's package.json.
 * It fallsback to finding it.
 */
export const pkgRootDir =
  process.env.PKG_DIR || parse(pkgUpSync({ cwd: dirname }) || '').dir

export const isRunningFromSource =
  !pkgRootDir.includes('node_modules')

export const devPort = getDevPort(pesslConfig)
export const hasSourcemap = getHasSourcemap(pesslConfig)

export const DEV_PROXY_PORT = 4000
/** SSL key 🔑 */
export const sslKeyPath = resolve(pkgRootDir, 'ssl/proxy.key')
/** SSL cert 📜 */
export const sslCertPath = resolve(pkgRootDir, 'ssl/proxy.cer')
