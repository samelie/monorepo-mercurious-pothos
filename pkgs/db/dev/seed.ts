#!/usr/bin/env -S yarn tsx

import { Kysely, PostgresDialect } from 'kysely'
import PG from 'pg'
import { v4 } from 'uuid'

import '@you/env'
import { useBcrypt } from '../auth/bcrypt'
import type { DB } from '../generated/kysely-types'

const host = process.env.POSTGRES_HOST || 'localhost'
const port = Number(process.env.POSTGRES_PORT) || 5544
const user = process.env.POSTGRES_USER || 'unicorn_user'
const password = process.env.POSTGRES_PASSWORD || 'magical_password'
const database = process.env.POSTGRES_DB || 'rainbow_database'

console.log(host, port, user, password, database)

// You'd create one of these when you start your app.
const db = new Kysely<DB>({
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

const userId = v4()

const bcrypt = useBcrypt()

async function getUsers() {
  const user = await db
    .insertInto('Profile')
    .values({
      hashedPassword: await bcrypt.hash('passverd'),
      email: 'sam@add.dog',
      name: 'sam',
      username: 'adddog',
      acl: '',
      organization: '',
      lastName: 'rad',
      status: 'ACTIVE',
      type: 'HUMAN',
      role: 'USER_ROLE_VERIFIED',
      bio: '',
      firstName: 'sam',
      providerId: '',
    })
    .returning('id')
    .execute()

  return user
}

function getProjects() {
  // {
  //   name: randCatchPhrase(),
  //   description: randCatchPhrase(),
  //   creator: { connect: { id: users.at(0)?.id } },
  //   premiereProjectId: '',
  //   revisionId: '',
  //   visibility: Visibility.VISIBILITY_PUBLIC,
  // },
}
async function getMedia(creatorId: string) {
  await db
    .insertInto('Media')
    .values({
      creatorId,
      revisionId: '',
      mimeType: 'jpeg',
      transcribed: false,
      visibility: 'VISIBILITY_PRIVATE',
      uri: 'https',
      type: 'MEDIA_TYPE_AUDIO',
    })
    .returning('id')
    .execute()
}

async function main() {
  const users = await getUsers()
  await Promise.all([getMedia(users.at(0).id)])
  // const projects = await Promise.all(
  //   getProjects(users).map((data) => client.project.create({ data })),
  // )
}

main()
