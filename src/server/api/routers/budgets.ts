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
            spendingUse: true
          }
        }
      }
    });
  }),
  getLastBudget: publicProcedure.query(async ({ ctx }) => {
    return await prisma.budget.findFirst({
      include: {
        projectUse: {
          select: {
            id: true,
            name: true,
            is_active: true,
            spendingUse: true
          }
        }
      }
    })
  }),
  getPartySpending: publicProcedure.query(async ({ ctx }) => {
    return await prisma.party.findMany({
      include: {
        spendingUse: true
      }
    })
  })
})