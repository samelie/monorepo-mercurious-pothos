import { join, resolve } from 'node:path'
import { readFileSync } from 'node:fs'
import {
  registerDbPlugin,
  registerMercuriusCachePlugin,
  registerMercuriusAuthPlugin,
  registerMercuriusPlugin,
  registerMercuriusLoggingPlugin,
} from '@you/db'
import '@you/env'
import {
  registerCookie,
  registerTrpcPlugin,
} from '@you/trpc/fastify/plugin'
import { codegenMercurius } from 'mercurius-codegen'

import cors from '@fastify/cors'
import type { FastifyInstance } from 'fastify'
import fastify from 'fastify'

const port = parseInt(process.env.MORTAR_PORT || '', 10)
const root = resolve('../../')

if (Number.isNaN(port)) throw new Error('Invalid port')

async function main() {
  const server = fastify({
    http2: true,
    https: {
      cert: readFileSync(join(root, 'pkgs/publish/ssl/proxy.cer')),
      key: readFileSync(join(root, 'pkgs/publish/ssl/proxy.key')),
    },
    // http2 / https causes types to be funny.
  }) as unknown as FastifyInstance

  await server.register(cors, {
    origin: `https://localhost:${process.env.WEB_PORT}`,
  })

  await registerCookie(server)
  await registerTrpcPlugin(server)
  await registerDbPlugin(server)
  await registerMercuriusPlugin(server)
  await registerMercuriusAuthPlugin(server)
  await registerMercuriusLoggingPlugin(server)
  await registerMercuriusCachePlugin(server)

  codegenMercurius(server, {
    targetPath: './src/graphql/generated/index.ts',
    // operationsGlob: './src/graphql/operations/*.gql',
    codegenConfig: {
      loadersCustomParentTypes: {
        Human: 'never',
      },
    },
  }).catch((err) => {
    console.error(err)
  })

  server
    .listen({ port })
    .then(() => {
      console.log(`Running https at ${port}`)
    })
    .catch((err) => {
      server.log.error(err)
    })
}

main()
