import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedCoreTeamProcedure
} from "@/server/api/trpc";
import { prisma } from "@/server/db";
import generateString from "@/utils/generateString";
import { env } from "@/env.mjs";
import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { S3Interface } from "@/interfaces/S3Interface";

export const coreRouter = createTRPCRouter({
  deleteProfileImage: protectedCoreTeamProcedure.mutation(async ({ ctx }) => {
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
