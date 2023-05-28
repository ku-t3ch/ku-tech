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
  deleteShortLink: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user.isCoreTeam) {
        throw new Error("You are not core team");
      }

      const link = await prisma.shortLink.findUnique({
        where: {
          id: input.id,
        },
        include: {
          request_user: {
            select: {
              email: true,
            },
          },
        },
      });

      if (link?.request_user?.email !== ctx.session?.user.email) {
        throw new Error("You are not owner of this link");
      }

      await prisma.shortLink.delete({
        where: {
          id: input.id,
        },
      });
      return true;
    }),
});
