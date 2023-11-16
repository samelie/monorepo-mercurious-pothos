import { builder } from '../../builder'
import { ProfileInput } from '../inputs/schema-inputs'
import { HumanType } from '../objects/schema-objects'

builder.queryField('getHumans', (t) =>
  t.field({
    type: [HumanType],
    args: {
      input: t.arg({
        type: ProfileInput,
        required: true,
      }),
    },
    resolve: async (root, args, ctx) => {
      const dd = await ctx.app.db.dbConnect
        .selectFrom('Profile')
        .selectAll()
        .execute()
      return dd
    },
  }),
)
