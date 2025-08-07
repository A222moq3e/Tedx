import { postRouter } from "~/server/api/routers/post";
import { usersRouter } from "~/server/api/routers/users";
import { eventsRouter } from "~/server/api/routers/events";
import { eventRegistrationsRouter } from "~/server/api/routers/eventRegistrations";
import { speakersRouter } from "~/server/api/routers/speakers";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  users: usersRouter,
  events: eventsRouter,
  eventRegistrations: eventRegistrationsRouter,
  speakers: speakersRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
