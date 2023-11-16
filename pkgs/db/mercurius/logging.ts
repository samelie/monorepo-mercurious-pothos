import mercuriusLogging from 'mercurius-logging'

import type { FastifyInstance } from 'fastify'

export async function registerMercuriusLoggingPlugin(
  fastify: FastifyInstance,
) {
  await fastify.register(mercuriusLogging, {
    logLevel: 'debug', // default: 'info'
    prependAlias: true, // default: false
    logBody: true, // default: false
    logVariables: true, // default: false
  })
}
