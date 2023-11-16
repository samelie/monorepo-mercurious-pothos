import '@you/env'
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify'
import type { FastifyInstance } from 'fastify'
import { createContext } from '@you/db'
import cookie from '@fastify/cookie'
import { appRouter } from '../server/routers/router'

export async function registerCookie(fastify: FastifyInstance) {
  await fastify.register(cookie, {
    secret: 'secret',
  })
}

export async function registerTrpcPlugin(fastify: FastifyInstance) {
  await fastify.register(fastifyTRPCPlugin, {
    prefix: '/trpc',
    trpcOptions: { router: appRouter, createContext },
  })
}
