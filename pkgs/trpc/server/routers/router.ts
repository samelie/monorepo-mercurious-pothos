import { mergeRouters, publicProcedure, router } from "../trpc";
import authRouter from "./auth-routes";

const publicRouter = router({
  getHello: publicProcedure.query(async ({ ctx }) => {
    return { message: 'hi' };
  }),
});

export const appRouter = mergeRouters(
  publicRouter,
  authRouter,
  // userRouter,
  // postRouter
);

export type AppRouter = typeof appRouter;
