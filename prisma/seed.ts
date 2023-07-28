import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


const main = async () => {
  // init budget data
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

  // init sponsor data
  await prisma.sponsor.createMany({
    data: [
      {
        brand_name: 'True 5G',
        brand_logo: 'https://yt3.googleusercontent.com/aar50xHrxwdmKrlvElDHEd3kD9JzxxQxbHBHQ8kbKmwkXTQiY4x0McrDctrZf9rvhZFbgHk5=s900-c-k-c0x00ffffff-no-rj'
      },
      {
        brand_name: 'Google',
        brand_logo: 'https://static.vecteezy.com/system/resources/previews/013/948/549/large_2x/google-logo-on-transparent-white-background-free-vector.jpg'
      },
      {
        brand_name: 'Lineman',
        brand_logo: 'https://privilege-cdn-prd.azureedge.net/PrivImages/29082019_163852_e025f1.jpg'
      }
    ]
  })
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
