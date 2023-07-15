import { type FC } from 'react';

import { Card } from '@nextui-org/react';
import { BarChartPartySpending } from '../BarChartPartySpending';

interface Props {
  totalBudget: number;
  data?: {
    name: string;
    amount: number;
  }[];
}

const PartySpending: FC<Props> = ({ totalBudget, data = [] }) => {
  return (
    <Card
      css={{
        padding: '1.5rem',
        border: 0,
      }}
    >
      <div className="pt-[.5rem] pb-[1.5rem] text-center text-[1.5rem] font-semibold">
        แผนภูมิแท่งแสดงการใช้งบประมาณของฝ่ายต่างๆ
      </div>
      <div className="overflow-x-auto md:flex md:flex-col md:items-center">
        <BarChartPartySpending
          height={310}
          width={800}
          maxYAmount={totalBudget}
          data={data}
        />
      </div>
    </Card>
  );
};

export default PartySpending;
