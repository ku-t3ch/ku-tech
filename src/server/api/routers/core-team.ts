import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { prisma } from "@/server/db";
import { env } from "@/env.mjs";

export const coreTeamRouter = createTRPCRouter({
  get: publicProcedure.query(async ({ ctx }) => {
    const coreTeam = await prisma.tagType.findMany({
      where: {
        OR: [
          {
            name: "core-team",
          },
          {
            name: "alumni",
          },
        ],
      },
      include: {
        tags: {
          include: {
            request_user: {
              select: {
                first_name_th: true,
                last_name_th: true,
                faculty: true,
                major: true,
                year: true,
                nick_name: true,
                core_team_profile_image_path: true,
              },
            },
            childTags: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    const imageBaseUrl = env.S3_ENV_TYPE === "development" ? "https://s3.tech.nisit.ku.ac.th/core-team-development/" : "https://s3.tech.nisit.ku.ac.th/core-team/"

    return coreTeam.map((coreTeam) => ({
      ...coreTeam,
      tags: coreTeam.tags.map((tag) => ({
        ...tag,
        request_user: tag.request_user.map((request_user) => ({
            ...request_user,
            core_team_profile_image_path: request_user.core_team_profile_image_path ? imageBaseUrl + request_user.core_team_profile_image_path : null,
        }))
      })),
    }));
  }),
});
