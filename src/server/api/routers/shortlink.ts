import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { prisma } from "@/server/db";

export const shortLinkRouter = createTRPCRouter({
  getShortLink: publicProcedure
    .input(
      z.object({
        short_link: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      let res = await prisma.shortLink.findUnique({
        where: {
          short_link: input.short_link,
        },
      });

      if (!res) {
        return null;
      }

      await prisma.shortLink.update({
        where: {
          short_link: input.short_link,
        },
        data: {
          count: res?.count! + 1,
        },
      });

      return res?.original_link;
    }),
});
