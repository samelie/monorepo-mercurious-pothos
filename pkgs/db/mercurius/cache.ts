import redis from '@fastify/redis'
import cache from 'mercurius-cache'

import type { FastifyInstance } from 'fastify'

export async function registerMercuriusCachePlugin(
  fastify: FastifyInstance,
) {
  await fastify.register(redis, {
    host: '127.0.0.1',
    port: 6377,
  })
  // https://github.com/mercurius-js/cache
  await fastify.register(cache, {
    ttl: 5,
    // all:true BREAKS URQL
    policy: {
      Query: {
        getHumans: true,
      },
    },
    storage: {
      type: 'redis',
      options: { client: fastify.redis, invalidation: true },
    },

    onDedupe: function (type, fieldName) {
      fastify.log.info({ msg: 'deduping', type, fieldName })
    },
    onHit: function (type, fieldName) {
      fastify.log.info({ msg: 'hit from cache', type, fieldName })
    },
    onMiss: function (type, fieldName) {
      fastify.log.info({ msg: 'miss from cache', type, fieldName })
    },
    onSkip: function (type, fieldName) {
      fastify.log.info({ msg: 'skip cache', type, fieldName })
    },

    // caching stats
    logInterval: 40,
    logReport: (report) => {
      fastify.log.info({ msg: 'cache stats' })
      console.table(report)
    },
  })
}
