import mercurius from 'mercurius'

import type { FastifyRedis } from '@fastify/redis'
import type { FastifyInstance, FastifyRequest } from 'fastify'
import type { Bcrypt } from '../auth/bcrypt'
import { schema } from '../pothos/schema'
import type { DbConnect } from '../fastify/kysely-db-connect'

// using declaration merging, add your plugin props to the appropriate fastify interfaces
// if prop type is defined here, the value will be typechecked when you call decorate{,Request,Reply}
declare module 'fastify' {
  interface FastifyInstance {
    redis: FastifyRedis
    db: {
      bcrypt: Bcrypt
      dbConnect: DbConnect
    }
  }
}

export type Context = {
  authorization?: string
  req: FastifyRequest
  app: FastifyInstance
  AuthScopes: {
    public: true
    user: boolean
  }

  // AuthScopes: {
  //   public: boolean
  //   employee: boolean
  //   deferredScope: boolean
  // }
}
const buildContext = async (req: FastifyRequest) => {
  return Promise.resolve({
    req,
    authorization: req.headers.authorization,
  })
}

export async function registerMercuriusPlugin(
  fastify: FastifyInstance,
) {
  await fastify.register(mercurius, {
    schema,
    context: buildContext,
    subscription: true,
    graphiql: true,
  })
}
