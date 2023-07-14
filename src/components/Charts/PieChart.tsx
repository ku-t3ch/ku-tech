import { useState, type FC } from 'react';
import { type Project } from '@/interfaces/BudgetsInterface';
import { PieChart as _PieChart, Pie, Sector } from 'recharts';

interface ActiveShapeProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  fill: string;
  payload: Project;
  percent: number;
}

const ActiveShape = (props: ActiveShapeProps) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
  } = props;

  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {(percent * 100).toFixed(2)}%
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#fff"
        className="z-40 font-semibold"
      >
        {payload.name}
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={22}
        textAnchor={textAnchor}
        fill="#999"
        className="text-[.9rem]"
      >
        {`${payload.amount?.toLocaleString()} บาท`}
      </text>
    </g>
  );
};

interface Props {
  width?: number;
  height?: number;
  data?: Project[];
}

export const PieChart: FC<Props> = ({
  width = 400,
  height = 400,
  data = [],
}) => {
  const [activeIdx, setActiveIdx] = useState<number>(0);

  return (
    <_PieChart width={width} height={height}>
      <Pie
        activeIndex={activeIdx}
        activeShape={ActiveShape}
        data={data.map((v) => {
          return {
            name: v.name,
            value: v.amount, // for rechart
            amount: v.amount,
          };
        })}
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={80}
        fill="#5286ED"
        dataKey="value"
        onMouseEnter={(_, idx) => setActiveIdx(idx)}
      />
    </_PieChart>
  );
};
