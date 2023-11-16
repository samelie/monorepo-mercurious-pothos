import mercuriusAuth from 'mercurius-auth'
import type { FastifyInstance } from 'fastify'
import Paseto from '../auth/paseto'

// DEPRECATED!!! POTHOS DOES ALL THE AUTH

export async function registerMercuriusAuthPlugin(
  fastify: FastifyInstance,
) {
  await fastify.register(mercuriusAuth, {
    authContext(context) {
      const permissions =
        context.reply.request.headers['x-user'] || ''
      return {
        permissions,
        authorization: context.reply.request.headers['authorization'],
      }
    },
    async applyPolicy(policy, parent, args, context, info) {
      console.log(context.auth)
      if (!context.auth) return
      if (context.auth.permissions === 'admin') return true
      // const token = context.auth.authorization
      // const res = await decodeToken(token)
      // return !!res?.authorized
    },
    mode: 'external',
    // policy: {
    //   Message: {
    //     __typePolicy: { requires: 'user' },
    //     adminMessage: { requires: 'admin' },
    //   },
    //   Query: {
    //     getMedia: { requires: 'user' },
    //   },
    // },
  })
}
