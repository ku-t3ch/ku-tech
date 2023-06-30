import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const budget1 = await prisma.budget.create({
    data: {
      name: "Budget 1",
      amount: 120_000,
    },
  });
}

//https://www.prisma.io/docs/guides/migrate/seed-database

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
