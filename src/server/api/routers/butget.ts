import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { prisma } from "@/server/db";

export const budgetRouter = createTRPCRouter({
  getBudget: publicProcedure.query(async () => {
    return await prisma.budget.findFirst({
      orderBy: {
        id: "desc",
      },
      take: 1,
      select: {
        id: true,
        name: true,
        amount: true,
        received_amount: {
          select: {
            name: true,
            amount: true,
          },
        },
        projectUse: {
          select: {
            name: true,
            amount: true,
            document_url: true,
          },
        },
      },
    });
  }),
  getSponsor: publicProcedure.query(async () => {
    return await prisma.sponsor.findMany({
      select: {
        brand_logo: true,
        brand_name: true,
      },
    });
  }),
  getProjects: publicProcedure
    .input(
      z.object({
        budgetId: z.string().nullish(),
        orderBy: z.enum(["desc", "asc"]),
      })
    )
    .query(async ({ input }) => {
      return await prisma.project.findMany({
        orderBy: {
          start_date: input?.orderBy ?? "desc",
        },
        where: {
          budgetUse: {
            some: {
              id: input.budgetId ?? "",
            },
          },
        },
        select: {
          name: true,
          amount: true,
          start_date: true,
          ended_date: true,
          spendingUse: {
            select: {
              name: true,
              amount: true,
            },
          },
        },
      });
    }),
});
