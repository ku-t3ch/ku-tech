import { FC } from "react";
import { Icon } from "@iconify/react";
import { Card } from "@nextui-org/react";

import tw from "tailwind-styled-components";
import CountUp from "react-countup";

interface Props {}

const ProjectSpending: FC<Props> = () => {
  const Grid = tw.div`
    grid
    grid-cols-1
    gap-3
    md:grid-cols-3
  `;

  return (
    <Grid>
      <Item icon="bx:money-withdraw" title="งบกิจกรรมนิสิต" amount={7_000_000} />
      <Item icon="solar:hand-money-outline" title="ได้รับจัดสรร" amount={7_000_000} />
      <Item icon="uil:money-withdrawal" title="คงเหลือ" amount={7_000_000} />
    </Grid>
  );
};

interface ItemProps {
  icon: string;
  title?: string;
  amount?: number;
}

const Item: FC<ItemProps> = ({ icon, title = "ไม่ระบุ", amount = 0 }) => {
  let Title = {
    Head: tw.div`
      flex
      items-center
      justify-center
      gap-1.5
      text-[#C0C7CD]
    `,
    Text: tw.div`
      text-sm
      tracking-wide
    `,
  };

  let Body = {
    Text: tw.div`
      text-[1.5rem]
      font-bold
    `,
  };

  return (
    <Card
      css={{
        border: 0,
        padding: "1.25rem",
      }}
      className="flex flex-col gap-1.5 text-center"
    >
      <Title.Head>
        <Icon icon={icon} />
        <Title.Text>{title}</Title.Text>
      </Title.Head>
      <Body.Text>
        <CountUp end={amount} />
      </Body.Text>
    </Card>
  );
};

export default ProjectSpending;
