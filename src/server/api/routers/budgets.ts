import { prisma } from "@/server/db";
import {
  createTRPCRouter,
  publicProcedure
} from "@/server/api/trpc";

export const budgetRouters = createTRPCRouter({
  getBudgetById: publicProcedure.query(async ({ ctx }) => {
    return await prisma.budget.findMany({
      include: {
        projectUse: {
          select: {
            id: true,
            name: true,
            amount: true
          }
        }
      }
    });
  }),
  getBudgetCurrentYears: publicProcedure.query(async ({ ctx }) => {
    return await prisma.budget.findFirst({
      include: {
        projectUse: {
          select: {
            id: true,
            name: true,
            amount: true,
          }
        }
      }
    })
  }),
  getAllProejectCount: publicProcedure.query(async ({ ctx }) => {
    return await prisma.project.count();
  })
})