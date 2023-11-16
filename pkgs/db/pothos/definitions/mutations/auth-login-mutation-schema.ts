import { useBcrypt } from '../../../auth/bcrypt'
import Paseto from '../../../auth/paseto'
import { builder } from '../../builder'
import { LoginInput } from '../inputs/schema-inputs'
import { LoginResponseType } from '../objects/schema-objects'

const bcrypt = useBcrypt()

builder.mutationField('login', (t) =>
  t.field({
    type: LoginResponseType,
    nullable: true,
    authScopes: {
      public: true,
    },
    skipTypeScopes: true,
    args: {
      input: t.arg({
        type: LoginInput,
        required: true,
      }),
    },
    resolve: async (root, args, ctx) => {
      const { email, password } = args.input
      if (!email) {
        console.log('no email')
        throw new Error('No email')
      }
      const u = await ctx.app.db.dbConnect
        .selectFrom('Profile')
        .select(['id', 'hashedPassword'])
        .where('email', '=', args.input.email || '')
        .executeTakeFirst()

      if (!u || !password || !u.hashedPassword) {
        console.log('no pass')
        throw new Error('no pass')
      }

      const valid = await bcrypt.compare(password, u.hashedPassword)
      if (!valid) {
        console.log('pass passss')
        throw new Error('pass password')
      }
      const token = await Paseto.sign({
        sub: email,
        iss: 'isser',
        role: 'admin',
      })

      return { token }
    },
  }),
)
