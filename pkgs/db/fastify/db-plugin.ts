import type { FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'
import { useBcrypt } from '../auth/bcrypt'
import { dbConnect } from './kysely-db-connect'

async function plugin(fastify: FastifyInstance) {
  const bcrypt = useBcrypt()
  fastify.decorate('db', {
    bcrypt,
    dbConnect,
  })
}

export default fp(plugin, {
  fastify: '4.x',
  name: 'fastify-db-plugin',
})
