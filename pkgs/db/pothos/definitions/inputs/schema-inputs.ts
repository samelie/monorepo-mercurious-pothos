import { builder } from '../../builder'

export const ProfileInput = builder.inputType('ProfileInput', {
  fields: (t) => ({
    id: t.string(),
  }),
})

export const LoginInput = builder.inputType('LoginInput', {
  fields: (t) => ({
    username: t.string({ required: false }),
    email: t.string({ required: false }),
    password: t.string(),
  }),
})
