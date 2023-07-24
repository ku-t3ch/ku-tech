import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


const main = async () => {
  await prisma.budget.create({
    data: {
      name: "โครงการปีการศึกษา 2566",
      amount: 7_000_000,
      received_amount: {
        create: [
          {
            name: 'งบกิจกรรมนิสิต',
            amount: 20_000
          },
          {
            name: 'ได้รับจัดสรร',
            amount: 120_000
          },
          {
            name: 'ผู้สนับสนุน',
            amount: 20_000
          }
        ]
      },
      projectUse: {
        create: [
          {
            name: 'โครงการ Techcamp ครั้งที่ 1',
            amount: 9_000,
            spendingUse: {
              create: [
                {
                  name: 'ค่าจ้างเหมารถตู้',
                  amount: 2700
                },
                {
                  name: 'กระดาษ A4',
                  amount: 140
                },
                {
                  name: 'กระดาษ 300 G',
                  amount: 300
                }
              ]
            }
          },
          {
            name: 'โครงการ FirstMeet',
            amount: 0
          }
        ]
      }
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
