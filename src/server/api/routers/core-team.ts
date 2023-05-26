import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { prisma } from "@/server/db";

export const coreTeamRouter = createTRPCRouter({
  get: publicProcedure.query(async ({ ctx }) => {
    const coreTeam = await prisma.tagType.findMany({
      where: {
        name: "core-team-cms",
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
          },
        },
      },
    });
    return coreTeam;
  }),
});
