import { FC } from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#17BFF4', '#00C49F'];

interface PieData {
  name: string;
  amount: number;
}

interface Props {
  data?: PieData[];
}

export const PieChartReceivedBudget: FC<Props> = ({ data }) => {
  return (
    <>
      <PieChart width={300} height={250}>
        <Pie
          data={data}
          cx={145}
          cy={125}
          innerRadius={60}
          outerRadius={80}
          fill="#17BFF4"
          paddingAngle={5}
          dataKey="amount"
        >
          {data?.map((_, idx) => (
            <Cell
              key={`cell-${idx}`}
              fill={COLORS[idx % COLORS.length]}
              stroke="0"
            />
          ))}
        </Pie>
      </PieChart>
      <div className="flex flex-col gap-[.5rem] py-[.65rem]">
        {data?.map((v, idx) => {
          return (
            <Badge
              key={`icon-${idx}`}
              color={COLORS[idx % COLORS.length]}
              data={v}
            />
          );
        })}
      </div>
    </>
  );
};

interface BadgeProps {
  color?: string;
  data: PieData;
}

export const Badge: FC<BadgeProps> = ({ color = COLORS[0], data }) => {
  return (
    <div className="flex items-center gap-[.5rem]">
      <span
        className="h-4 w-4 rounded-[.25rem]"
        style={{
          backgroundColor: color,
        }}
      />
      <span>{data?.name}</span>
      <span>({data.amount.toLocaleString()} บาท)</span>
    </div>
  );
};
