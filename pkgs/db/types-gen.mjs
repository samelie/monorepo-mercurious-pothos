#!/usr/bin/env yarn tsx

import { $ } from 'zx'

await $`dotenv -e ./.prisma/.env.development -- yarn prisma generate --schema ./prisma/schema.prisma`
await $`dotenv -e ./.prisma/.env.development -- yarn kysely-codegen`
await $`graphql-code-generator --config graphql-codegen.ts`
