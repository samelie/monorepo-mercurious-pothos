import { writeFileSync } from 'node:fs'
import type { CodegenConfig } from '@graphql-codegen/cli'
import { lexicographicSortSchema, printSchema } from 'graphql'
import { schema } from './pothos/schema'

const schemaAsString = printSchema(lexicographicSortSchema(schema))

writeFileSync('./generated/schema-generated.graphql', schemaAsString)

const config: CodegenConfig = {
  overwrite: true,
  schema: printSchema(schema),
  documents: [
    './gql/*.graphql',
    'apps/backend/src/**/*.vue',
    './src/custom-gql-def/*.ts',
  ],
  generates: {
    './generated/client/graphql-urql.ts': {
      // preset: 'near-operation-file',
      // preset: 'client',
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-vue-urql',
      ],
      config: {
        withHooks: true,
        enumsAsTypes: true,
        useTypeImports: true,
        maybeValue: 'T | undefined',
        scalars: {
          Long: 'number',
          Instant: 'string',
        },
      },
    },
  },
}

export default config
