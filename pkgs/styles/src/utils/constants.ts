import { parse } from 'node:path'
import { sync as pkgUpSync } from 'pkg-up'
import { fileURLToPath } from 'node:url'
const dirname = parse(fileURLToPath(import.meta.url)).dir
export const pkgRootDir = parse(pkgUpSync({ cwd: dirname }) || '').dir
