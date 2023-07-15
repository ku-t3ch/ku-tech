import CountUp from 'react-countup';

import { type FC } from 'react';

import { Card } from '@nextui-org/react';
import { PieChartReceivedBudget } from '../PieChartReceivedBudget';

interface Props {
  titleBudget?: string;
  commonBudget: number;
  othersBudget: number;
}

const ReceiveBudget: FC<Props> = ({
  titleBudget,
  commonBudget,
  othersBudget,
}) => {
  return (
    <>
      <Card
        css={{
          border: 0,
          padding: '1.5rem',
          textAlign: 'center',
        }}
      >
        <div className="text-[1.8rem] font-semibold">{titleBudget}</div>
        <div className="text-[2.25rem] font-bold text-[#17BFF4]">
          + <CountUp end={commonBudget + othersBudget} /> THB
        </div>
      </Card>
      <Card
        css={{
          border: 0,
          padding: '1.5rem',
        }}
      >
        <div className="py-[.5rem] text-center text-[1.5rem] font-semibold">
          แผนภูมิแสดงที่มางบประมาณ
        </div>
        <div className="flex flex-col items-center justify-center">
          <PieChartReceivedBudget
            data={[
              {
                name: 'กองพัฒนานิสิต',
                amount: commonBudget,
              },
              {
                name: 'ผู้สนับสนุนอื่นๆ',
                amount: othersBudget,
              },
            ]}
          />
        </div>
      </Card>
    </>
  );
};

export default ReceiveBudget;
