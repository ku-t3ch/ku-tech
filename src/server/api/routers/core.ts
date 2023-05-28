import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { prisma } from "@/server/db";
import generateString from "@/utils/generateString";
import { env } from "@/env.mjs";
import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { S3Interface } from "@/interfaces/S3Interface";

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
  deleteProfileImage: protectedProcedure.mutation(async ({ ctx }) => {
    if (!ctx.session.user.isCoreTeam) {
      throw new Error("You are not core team");
    }

    let S3_ENV = JSON.parse(env.S3) as S3Interface;

    try {
      const s3 = new S3Client({
        credentials: {
          accessKeyId: S3_ENV.accessKey,
          secretAccessKey: S3_ENV.secretKey,
        },
        endpoint: S3_ENV.url,
        forcePathStyle: true,
        region: "ap-southeast-1",
      });

      await s3.send(
        new DeleteObjectCommand({
          Bucket: "core-team",
          Key: `${ctx.session?.user.sub}.png`,
        })
      );

      await prisma.request.update({
        where: {
          email: ctx.session?.user.email,
        },
        data: {
          core_team_profile_image_path: null,
        },
      });
    } catch (error: any) {
      throw new Error(error.message);
    }

    return true;
  }),
});
