import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { prisma } from "@/server/db";
import generateString from "@/utils/generateString";

export const coreRouter = createTRPCRouter({
  getAllShortLink: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.session?.user.isCoreTeam) {
      throw new Error("You are not core team");
    }
    let res = await prisma.shortLink.findMany({
      where: {
        request_user: {
          email: ctx.session?.user.email,
        },
      },
    });
    return res;
  }),
  createShortLink: protectedProcedure
    .input(
      z.object({
        original_link: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user.isCoreTeam) {
        throw new Error("You are not core team");
      }
      const link = generateString();
    //   const exitLink = await prisma.shortLink.findUnique({
    //     where: {
    //       original_link: input.original_link,
    //     },
    //   });

    //   if (exitLink) {
    //     return exitLink.short_link;
    //   }

      await prisma.shortLink.create({
        data: {
          original_link: input.original_link,
          short_link: link,
          is_active: true,
          request_user: {
            connect: {
              email: ctx.session?.user.email,
            },
          },
        },
      });
      return link;
    }),
});
