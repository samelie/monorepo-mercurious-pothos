import { userSchema } from '../schema/all'
import { middleware, publicProcedure, router } from '../trpc'
import { registerHandler } from '../controllers/auth-controller'
import { TRPCError } from '@trpc/server'

// Middleware
const isAuthenticated = middleware(async ({ ctx, next }) => {
  const aCookieValue = ctx.req.cookies.cookieName
  if (!aCookieValue) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  return next({
    ctx: {
      session: {
        // userId: session.getUserId(),
      },
    },
  })
})
const authenticate = middleware(async ({ ctx, next }) => {
  const aCookieValue = ctx.req.headers.authorization
  // const { user } = data
  // if (!aCookieValue || error || !user) {
  //   throw new TRPCError({
  //     code: 'UNAUTHORIZED',
  //     message: error?.message,
  //   })
  // }
  return next({
    ctx: {
      session: {},
    },
  })
})
const authenticateProcedure = publicProcedure.use(authenticate)
const authenticatedProcedure = publicProcedure.use(isAuthenticated)

const authRouter = router({
  registerUser: publicProcedure
    .input(userSchema)
    .mutation(({ input }) => registerHandler({ input })),

  loginUser: authenticateProcedure.query(({ input, ctx }) => {
    return { message: 'hi, you are authenticated' }
  }),
  // logoutUser: publicProcedure.mutation(({ ctx }) => logoutHandler({ ctx })),
  // refreshAccessToken: publicProcedure.query(({ ctx }) =>
  //   refreshAccessTokenHandler({ ctx })
  // ),
})

export default authRouter
