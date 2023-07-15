import CountUp from 'react-countup';

import tw from 'tailwind-styled-components';

import { type FC } from 'react';

import { Card } from '@nextui-org/react';
import { PieChartReceivedBudget } from '../PieChartReceivedBudget';

const ChartContainer = tw.div`
  flex
  flex-col
  items-center
  justify-center
`;

const ChartTitle = tw.div`
  py-[.5rem]
  text-center
  text-[1.5rem]
  font-semibold
`;

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
        <ChartTitle>แผนภูมิแสดงที่มางบประมาณ</ChartTitle>
        <ChartContainer>
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
        </ChartContainer>
      </Card>
    </>
  );
};

export default ReceiveBudget;
