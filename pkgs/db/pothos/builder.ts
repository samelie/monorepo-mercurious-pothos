import SchemaBuilder from '@pothos/core'
import SimpleObjectsPlugin from '@pothos/plugin-simple-objects'
import ScopeAuthPlugin from '@pothos/plugin-scope-auth'
import type { Context } from '../mercurius/mercurius'
import Paseto from '../auth/paseto'
interface Root<T> {
  Context: T
}

export const builder = new SchemaBuilder<Root<Context>>({
  plugins: [SimpleObjectsPlugin, ScopeAuthPlugin],
  authScopes: async (context) => ({
    public: true,

    user: async () => {
      const res = await Paseto.decode(context.authorization)
      return !!res?.authorized
    },
  }),
})

builder.queryType({ authScopes: { user: true } })
builder.mutationType({
  authScopes: { user: true },
})
