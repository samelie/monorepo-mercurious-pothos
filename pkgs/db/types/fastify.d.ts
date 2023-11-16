import type { FastifyRedis } from '@fastify/redis'
import redis from '@fastify/redis'
import type { Bcrypt } from '../auth/bcrypt'
import type { DbConnect } from './kysely-db-connect'

declare module 'fastify' {
  interface FastifyInstance {
    redis: FastifyRedis
    db: {
      bcrypt: Bcrypt
      dbConnect: DbConnect
    }
  }
}

declare module 'mercurius' {
  export interface MercuriusContext {
    auth?: {
      permissions: 'admin' | 'user'
      authorization: string
    }
  }
}
