import tw from 'tailwind-styled-components';

import { type FC } from 'react';

import { Card } from '@nextui-org/react';
import { BarChartPartySpending } from '../BarChartPartySpending';

const Title = tw.div`
  pt-[.5rem]
  pb-[1.5rem]
  text-center
  text-[1.5rem]
  font-semibold
`;

const ChartContainer = tw.div`
  overflow-x-auto
  md:flex
  md:flex-col
  md:items-center
`;

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
      <Title>แผนภูมิแท่งแสดงการใช้งบประมาณของฝ่ายต่างๆ</Title>
      <ChartContainer>
        <BarChartPartySpending
          height={310}
          width={800}
          maxYAmount={totalBudget}
          data={data}
        />
      </ChartContainer>
    </Card>
  );
};

export default PartySpending;
