import '@you/env'
import { readFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { registerDbPlugin } from '@you/db'

import type { FastifyInstance } from 'fastify'
import fastify from 'fastify'
const port = parseInt(process.env.INGEST_APP_PORT || '', 10)
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

  await registerDbPlugin(server)
  await server.register(import('fastify-raw-body'), {
    field: 'rawBody', // change the default request.rawBody property name
    global: false, // add the rawBody to every request. **Default true**
    encoding: 'utf8', // set it to false to set rawBody as a Buffer **Default utf8**
    runFirst: true, // get the body before any preParsing hook change/uncompress it. **Default false**
    routes: [], // array of routes, **`global`** will be ignored, wildcard routes not supported
  })

  server.addHook('onRequest', (request, res, next) => {
    if (request.method === 'POST') {
      const apiKey = request.headers['x-ig-bot']

      if (!apiKey || apiKey !== 'ingest') {
        res.code(401).send({ error: 'Unauthorized' })
      } else {
        next()
      }
    }
  })

  server.post('/my-followers', {
    config: {
      // add the rawBody to this route. if false, rawBody will be disabled when global is true
      rawBody: true,
    },
    handler(req, reply) {
      // req.rawBody the string raw body
      reply.send(req.rawBody)
    },
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
