import dotenv from 'dotenv-flow'
import { join, parse } from 'node:path'
import { fileURLToPath } from 'node:url'
import { sync as pkgUpSync } from 'pkg-up'
const dirname = parse(fileURLToPath(import.meta.url)).dir
export const pkgRootDir = parse(pkgUpSync({ cwd: dirname }) || '').dir
const p = join(pkgRootDir, '../../', '.config')
dotenv.config({ path: p })
