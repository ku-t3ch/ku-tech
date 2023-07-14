import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.budget.create({
    data: {
      name: "งบประมาณประจำปี 2566",
      amount: 120_000,
      projectUse: {
        create: [
          {
            name: 'TechCamp #1',
            amount: 50_000
          },
          {
            name: 'FirstMeet #1',
            amount: 10_000
          }
        ]
      }
    },
  });
}


main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
