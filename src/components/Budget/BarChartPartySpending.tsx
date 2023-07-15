import { type FC } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import { Card } from '@nextui-org/react';

interface BarData {
  name: string;
  amount: number;
}

const renderCustomTooltip = (props: any) => {
  const payload = props?.payload[0]?.payload ?? null;

  if (!payload) return;

  const data: BarData = payload;

  return (
    <Card
      css={{
        padding: '.5rem',
        border: 0,
        background: '#292C30',
        borderRadius: '.5rem',
        minWidth: '10rem',
      }}
    >
      <div className="flex flex-col">
        <span className="font-bold">{data.name}</span>
        <span className="text-[#E6E0E9]">
          {data.amount === 0
            ? 'ไม่มีข้อมูล'
            : `จำนวน ${data.amount.toLocaleString()} THB`}
        </span>
      </div>
    </Card>
  );
};

interface Props {
  height: number | string;
  width: number | string;
  maxYAmount?: number;
  data: BarData[];
}

export const BarChartPartySpending: FC<Props> = ({
  height,
  width,
  maxYAmount,
  data,
}) => {
  return (
    <div
      style={{
        height,
        width,
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="4 4" />
          <XAxis
            type="category"
            dataKey="name"
            tick={{ fill: '#fff' }}
            dy={5}
          />
          <YAxis
            type="number"
            tick={{ fill: '#fff' }}
            tickFormatter={(tick) => tick?.toLocaleString()}
            domain={[0, maxYAmount ?? 'auto']}
            dx={-5}
          />
          <Tooltip content={renderCustomTooltip} cursor={false} />
          <Bar dataKey="amount" maxBarSize={60} fill="#17BFF4" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
