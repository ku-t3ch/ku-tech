import CountUp from 'react-countup';
import tw from 'tailwind-styled-components';

import { type FC, type ReactNode } from 'react';

import { Icon } from '@iconify/react';
import { Card } from '@nextui-org/react';

const Grid = tw.div`
  grid
  grid-cols-1
  gap-[1rem]
  md:grid-cols-3
`;

interface Props {
  totalProject: number;
  expense: number;
  balance: number;
}

const BudgetSummary: FC<Props> = ({ totalProject, expense, balance }) => {
  return (
    <Grid>
      <BudgetReport
        icon={<Icon icon="mdi:list-box-outline" className="text-[1.5rem]" />}
        title="โครงการทั้งหมด"
        amount={totalProject}
      />
      <BudgetReport
        icon={
          <Icon icon="ri:money-dollar-circle-line" className="text-[1.5rem]" />
        }
        title="งบประมาณที่ใช้ไป"
        amount={expense}
      />
      <BudgetReport
        icon={<Icon icon="tabler:wallet" className="text-[1.5rem]" />}
        title="งบประมาณคงเหลือ"
        amount={balance}
      />
    </Grid>
  );
};

export default BudgetSummary;

interface BudgetReportProps {
  icon?: ReactNode;
  title: string;
  amount: number;
}

const BudgetReport: FC<BudgetReportProps> = ({ icon, title, amount }) => {
  return (
    <Card
      css={{
        padding: '1.5rem',
        border: 0,
      }}
      className="text-center font-bold tracking-wider"
    >
      <div className="flex items-center justify-center gap-[.5rem] text-[1.25rem] text-[#E6E0E9]">
        {icon}
        {title}
      </div>
      <div className="py-[.25rem] text-[2.5rem] text-white">
        <CountUp end={amount} />
      </div>
    </Card>
  );
};
