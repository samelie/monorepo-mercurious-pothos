import dotenv from 'dotenv'
import { join, parse } from 'node:path'
import { fileURLToPath } from 'node:url'

const p = join(parse(fileURLToPath(import.meta.url)).dir, '../../../', '.config')
dotenv.config({ path: p })
