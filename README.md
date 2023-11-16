## Getting started

`docker:up` or `docker:build`

`y dev`

First push a fresh db with `dev:db:push`. Any other changes do `dev:db:migrate`

Very primitive `dev:db:seed`

## Stack

- Prisma for schema and type-gen
- Pothos for GraphQL schema + auth
- Mercurius fastify for server
- Kysely for ORM gql resolvers
- URQL for gql client

## VS Code issues

- unocss autovomplete doesnt work

- tsc clashes with vue files https://stackoverflow.com/questions/54839057/vscode-showing-cannot-find-module-ts-error-for-vue-import-while-compiling-doe/73710755#73710755
