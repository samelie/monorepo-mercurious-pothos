import { cacheExchange } from '@urql/exchange-graphcache'
import { Client, fetchExchange } from '@urql/vue'

export const client = new Client({
  url: 'https://localhost:3000/graphql',
  exchanges: [cacheExchange({}), fetchExchange],
})
