import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.party.createMany({
    data: [
      {
        name: 'ฝ่ายบริหาร'
      },
      {
        name: 'ฝ่ายสารสนเทศ'
      },
      {
        name: 'ฝ่ายกิจกรรม'
      },
      {
        name: 'ฝ่ายประชาสัมพันธ์'
      }
    ]
  })

  await prisma.budget.create({
    data: {
      name: "งบประมาณประจำปี 2566",
      common_amount: 120_000,
      others_amount: 20_000,
      projectUse: {
        create: [
          {
            name: 'TechCamp #1',
            spendingUse: {
              create: [
                {
                  name: 'ค่าเดินทาง',
                  amount: 5_000,
                },
                {
                  name: 'ค่าอาหารสำหรับ Staff',
                  amount: 3_000,
                }
              ]
            }
          },
          {
            name: 'FirstMeet #1',
            spendingUse: {
              create: [
                {
                  name: 'ค่าเช่า True Lab',
                  amount: 10_000,
                }
              ]
            }
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
