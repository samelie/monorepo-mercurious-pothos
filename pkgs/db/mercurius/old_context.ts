import type { FastifyRequest } from 'fastify'
import type { Kysely } from 'kysely'
import { db } from '../fastify/connect'
import type { DB } from '../generated/kysely-types'

export interface Context {
  db: Kysely<DB>
  req: FastifyRequest
}

export const context = { db }
