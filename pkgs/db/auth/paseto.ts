import type { KeyObject } from 'node:crypto'
import type { FastifyRedis } from '@fastify/redis'
import bcrypt from 'bcryptjs'
import { V4 } from 'paseto'

interface DecodedToken {
  exp: string
  iat: string
  iss: string
  sub: string
  role: string
  refreshToken: string
}
const roleLevels = new Map([
  ['0', 0],
  ['1', 1],
])
type UnwrapPromise<T> = T extends PromiseLike<infer U> ? U : T

let cachedKey: KeyObject | undefined = undefined

const bearerRegEx = /\|*Bearer\|*/g
const issuer = 'issuer'
// https://github.com/panva/paseto/issues/1#issuecomment-565604403
const upsertPrivateKey = async (suffix = '') => {
  if (cachedKey) return cachedKey

  const privateKey = await V4.generateKey('public')
  if (!cachedKey) {
    const b = privateKey
    cachedKey = b
  }
  return privateKey
}

interface SignToken {
  iss: string
  sub: string
  role: string
}

class Paseto {
  /**
   * decode
   */
  public async decode(token?: string) {
    if (!token) return null
    const privateKey = await upsertPrivateKey()
    let decoded
    const cleaned = token.replace(bearerRegEx, '').trim()
    try {
      decoded = await V4.verify(cleaned, privateKey, {
        issuer,
      })
    } catch (e) {
      console.warn(`Caught: decodeToken ${e}`)
    }
    console.log(decoded)
    if (!decoded) return null
    const dt = decoded as DecodedToken
    if (!dt || !dt.exp || !dt.sub) return null
    const userID = dt.sub
    const now = Date.now()
    const expiresAt = new Date(dt.exp).getTime()
    const role = dt.role
    const lvl = Number(roleLevels.get(role) || 0)

    const updatedToken: string | undefined = undefined
    if (expiresAt < now) {
      // FIX
      // const r = await signToken({})
      // updatedToken = r.updatedToken
      // lvl = r.lvl
    }

    return {
      userID,
      role: lvl,
      updatedToken,
      authorized: true,
    }
  }

  /**
   * sign
   */
  public async sign(con: SignToken) {
    const privateKey = await upsertPrivateKey()
    const contents = {
      ...con,
      iss: issuer,
    }
    try {
      const token = await V4.sign(contents, privateKey, {
        expiresIn: '5min',
      })
      console.log(token)
      return token
    } catch (error) {
      console.log(error)
    }
    return ''
  }
}

export default new Paseto()
