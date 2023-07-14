import CountUp from 'react-countup';

import { NextPage } from 'next';
import { Card } from '@nextui-org/react';
import { PieChart } from '@/components/Charts/PieChart';

import { api } from '@/utils/api';

const Budget: NextPage<{}> = () => {
  const budget = api.budgets.getBudgetCurrentYears.useQuery();
  const allProjectCount = api.budgets.getAllProejectCount.useQuery();

  return (
    <>
      <div className="py-[6rem] text-center">
        <div className="text-[2rem] font-bold">งบประมาณรายจ่าย</div>
      </div>
      <div className="mx-auto flex w-full max-w-[70rem] flex-col px-[1rem]">
        <div className="grid grid-cols-1 gap-[1.5rem] md:grid-cols-2">
          <section>
            <Card
              css={{
                border: 0,
                padding: '1.5rem',
                marginBottom: '1rem',
                textAlign: 'center',
              }}
            >
              <div className="text-[1.8rem] font-semibold">
                {budget.data?.name}
              </div>
              <div className="text-[2.25rem] font-bold text-[#17BFF4]">
                + <CountUp end={budget.data?.amount ?? 0} /> THB
              </div>
            </Card>
            <Card
              css={{
                border: 0,
                padding: '1.5rem',
              }}
            >
              <div className="flex items-center justify-center">
                <PieChart
                  width={500}
                  height={300}
                  data={budget?.data?.projectUse ?? []}
                />
              </div>
              <div className="text-center">
                กราฟวงกลมแสดงการใช้งบประมาณในแต่ละโครงการ
              </div>
            </Card>
          </section>
          <section>
            <Card
              css={{
                border: 0,
                padding: '2rem',
                textAlign: 'center',
                marginBottom: '1rem',
              }}
            >
              <div className="flex text-[1.3rem]">
                <div className="flex flex-1 items-center justify-start">
                  <span className="text-start text-[1.8rem] font-semibold">
                    ใช้ไปทั้งสิ้น
                  </span>
                </div>
                <div className="flex flex-1 items-center justify-end">
                  <div className="text-end text-[1.8rem] font-bold text-[#A889FF]">
                    <span className="mr-[.5rem]">-</span>
                    <CountUp
                      end={
                        budget.data?.projectUse.reduce(
                          (total, data) => total + data.amount,
                          0,
                        ) ?? 0
                      }
                    />
                    <span className="ml-[.5rem]">THB</span>
                  </div>
                </div>
              </div>
            </Card>
            <Card
              css={{
                border: 0,
                padding: '1.5rem',
                textAlign: 'center',
                marginBottom: '1rem',
              }}
            >
              <div className="py-[.5rem] text-[1.5rem] font-semibold">
                จำนวนโครงการทั้งหมดในปีนี้
              </div>
              <div className="text-[4rem] font-bold text-white">
                <CountUp end={budget.data?.projectUse?.length ?? 0} />
              </div>
            </Card>
            <Card
              css={{
                border: 0,
                padding: '1.5rem',
                textAlign: 'center',
              }}
            >
              <div className="py-[.5rem] text-[1.5rem] font-semibold">
                จำนวนโครงการทั้งหมด
              </div>
              <div className="text-[4rem] font-bold text-white">
                <CountUp end={allProjectCount?.data ?? 0} />
              </div>
            </Card>
          </section>
        </div>
      </div>
    </>
  );
};

export default Budget;
