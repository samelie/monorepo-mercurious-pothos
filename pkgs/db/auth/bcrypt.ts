import bcrypt from 'bcryptjs'
import { V3 as paseto } from 'paseto'

export { paseto }
export const issuer = 'pessl'

const SALT_ROUNDS = 2

export function useBcrypt() {
  async function hash(pass: string) {
    return bcrypt.hash(pass, SALT_ROUNDS)
  }
  async function compare(pass: string, hasedPass: string) {
    return bcrypt.compare(pass, hasedPass)
  }
  return {
    hash,
    compare,
  }
}

export type Bcrypt = ReturnType<typeof useBcrypt>
