import { Kysely, PostgresDialect } from 'kysely'
import PG from 'pg'

import '@you/env'

import type { DB } from '../generated/kysely-types'

const host = process.env.POSTGRES_HOST || 'localhost'
const port = Number(process.env.POSTGRES_PORT) || 5544
const user = process.env.POSTGRES_USER || 'unicorn_user'
const password = process.env.POSTGRES_PASSWORD || 'magical_password'
const database = process.env.POSTGRES_DB || 'rainbow_database'

// You'd create one of these when you start your app.
export const dbConnect = new Kysely<DB>({
  // Use MysqlDialect for MySQL and SqliteDialect for SQLite.
  dialect: new PostgresDialect({
    pool: new PG.Pool({
      host,
      port,
      user,
      password,
      database,
    }),
  }),
})

export type DbConnect = typeof dbConnect
