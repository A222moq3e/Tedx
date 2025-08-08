import { appRouter } from "~/server/api/root";
import { fetchHandler } from "trpc-playground/handlers/fetch";

const setupHandler = fetchHandler({
  router: appRouter,
  trpcApiEndpoint: "/api/trpc",
  playgroundEndpoint: "/api/trpc-playground",
  // Optional: uncomment if you're using superjson
  // request: {
  //   superjson: true,
  // },
});

const handler = async (req: Request) => {
  const playgroundHandler = await setupHandler;
  return await playgroundHandler(req);
};

export { handler as GET, handler as POST };