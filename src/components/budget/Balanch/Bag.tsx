import { Icon } from "@iconify/react";
import { Card } from "@nextui-org/react";
import { FC } from "react";

import CountUp from "react-countup/";
import tw from "tailwind-styled-components";

interface Props {
  icon: string;
  title?: string;
  amount?: number;
}

export const Bag: FC<Props> = ({ icon, title = "ไม่ระบุ", amount = 0 }) => {
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
