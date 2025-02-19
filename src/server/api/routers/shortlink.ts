import { z } from "zod";

import {
  createTRPCRouter,
  protectedMemberProcedure
} from "@/server/api/trpc";
import { prisma } from "@/server/db";
import generateString from "@/utils/generateString";

export const shortLinkRouter = createTRPCRouter({
  getAllShortLinkUser: protectedMemberProcedure.query(async ({ ctx }) => {
    let res = await prisma.shortLink.findMany({
      where: {
        request_user: {
          email: {
            equals: ctx.session?.user.email,
            mode: 'insensitive'
          }
        },
      },
    });
    return res;
  }),
  createShortLink: protectedMemberProcedure
    .input(
      z.object({
        original_link: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const link = generateString();

      const user = await prisma.request.findFirst({
        where: {
          email: {
            equals: ctx.session?.user.email,
            mode: 'insensitive'
          }
        }
      });

      if (!user) {
        throw new Error("User not found");
      }

      await prisma.shortLink.create({
        data: {
          original_link: input.original_link,
          short_link: link,
          is_active: true,
          request_user: {
            connect: {
              id: user.id,
            },
          },
        },
      });
      return link;
    }),
  deleteShortLink: protectedMemberProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
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
