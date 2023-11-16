
/**
 * This file contains the root router of your tRPC-backend
 */
import { mediaRouter } from './media';
import { publicProcedure, router } from './trpc';

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'yay!'),

  media: mediaRouter,
});

export type AppRouter = typeof appRouter;
