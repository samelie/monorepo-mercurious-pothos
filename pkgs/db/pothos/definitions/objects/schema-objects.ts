import { builder } from '../../builder'

export const HumanType = builder.simpleObject('Human', {
  fields: (t) => ({
    id: t.id(),
  }),
})
export const LoginResponseType = builder.simpleObject(
  'LoginResponse',
  {
    fields: (t) => ({
      token: t.string(),
    }),
  },
)
