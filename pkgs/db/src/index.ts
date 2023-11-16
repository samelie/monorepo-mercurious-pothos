import type { FastifyInstance } from 'fastify'

import { dbConnect } from '../fastify/kysely-db-connect'

export { registerMercuriusCachePlugin } from '../mercurius/cache'
export { registerMercuriusLoggingPlugin } from '../mercurius/logging'
export { registerMercuriusPlugin } from '../mercurius/mercurius'
export { registerMercuriusAuthPlugin } from '../mercurius/auth'

import dbPlugin from '../fastify/db-plugin'

export async function registerDbPlugin(fastify: FastifyInstance) {
  await fastify.register(dbPlugin, {})
}

export function createContext() {
  return { db: dbConnect }
}
