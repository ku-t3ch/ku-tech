
import {
  createTRPCRouter,
  publicProcedure,
} from "@/server/api/trpc";
import { prisma } from "@/server/db";

export const budgetRouter = createTRPCRouter({
  getBudget: publicProcedure.query(async () => {
    return await prisma.budget.findFirst({
      select: {
        name: true,
        amount: true,
        received_amount: {
          select: {
            name: true,
            amount: true
          }
        },
        projectUse: {
          select: {
            id: true,
            name: true,
            amount: true,
            spendingUse: {
              select: {
                name: true,
                amount: true
              }
            }
          }
        }
      }
    })
  }),
  getSponsor: publicProcedure.query(async () => {
    return await prisma.sponsor.findMany({
  
      select: {
        brand_logo: true,
        brand_name: true,
      }
    })
  })
});
