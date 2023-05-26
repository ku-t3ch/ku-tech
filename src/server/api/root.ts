import { createTRPCRouter } from "@/server/api/trpc";
import { joinRouter } from "./routers/join";
import { shortLinkRouter } from "./routers/shortlink";
import { coreTeamRouter } from "./routers/core-team";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  join: joinRouter,
  shortlink: shortLinkRouter,
  coreTeam: coreTeamRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
