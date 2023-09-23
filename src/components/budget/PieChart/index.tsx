import { FC } from "react";
import { Card } from "@nextui-org/react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { BadgeText } from "./Badge";

import tw from "tailwind-styled-components";

ChartJS.register(ArcElement, Tooltip);

interface Received {
  name: string | null;
  amount: number;
}

interface Props {
  data: Received[];
}

const PieChart: FC<Props> = ({ data = [] }) => {
  const getMoneyLabels = () => {
    let labels: string[] = [];

    data.map((v) => {
      labels = [...labels, v?.name ?? "ไม่ระบุ"];
    });

    return labels;
  };

  const getMoneyValues = () => {
    let values: number[] = [];

    data.map((v) => {
      values = [...values, v.amount];
    });

    return values;
  };

  const chartData = {
    labels: getMoneyLabels(),
    datasets: [
      {
        label: " จำนวน",
        data: getMoneyValues(),
        backgroundColor: BG_COLORS,
        borderColor: BD_COLORS,
        borderWidth: 1,
      },
    ],
  };
  return (
    <Card
      css={{
        border: 0,
        padding: "1.5rem",
      }}
    >
      <Chart.Title>แผนภูมิแสดงที่มางบประมาณ</Chart.Title>
      <Chart.Container>
        <Chart.Body>
          <Doughnut data={chartData} />
        </Chart.Body>
      </Chart.Container>
      <Chart.Badges>
        {data.map((value, idx) => {
          return (
            <BadgeText
              key={`chart-badge-item-${idx}`}
              bgColor={BG_COLORS[idx]}
              bdColor={BD_COLORS[idx]}
              text={value?.name ?? "ไม่ระบุ"}
            />
          );
        })}
      </Chart.Badges>
    </Card>
  );
};

const Chart = {
  Title: tw.div`
    text-center
    text-[1.15rem]
    font-bold
    tracking-wide
  `,
  Container: tw.div`
    py-[2rem]
    flex
    items-center
    justify-center
  `,
  Body: tw.div`
    h-[15rem]
    w-[15rem]
  `,
  Badges: tw.div`
    flex
    flex-wrap
    justify-center
    gap-2
  `,
};

const BG_COLORS = [
  "rgba(255, 99, 132, .5)",
  "rgba(54, 162, 235, .5)",
  "rgba(255, 206, 86, .5)",
  "rgba(75, 192, 192, .5)",
  "rgba(153, 102, 255, .5)",
  "rgba(255, 159, 64, .5)",
];

const BD_COLORS = [
  "rgba(255, 99, 132, 1)",
  "rgba(54, 162, 235, 1)",
  "rgba(255, 206, 86, 1)",
  "rgba(75, 192, 192, 1)",
  "rgba(153, 102, 255, 1)",
  "rgba(255, 159, 64, 1)",
];

export default PieChart;
