import { FC } from "react";
import tw from "tailwind-styled-components";

interface Props {
  bgColor?: string;
  bdColor?: string;
  text?: string;
}

export const BadgeText: FC<Props> = ({ bgColor = "rgba(255, 255, 255, .2)", bdColor, text }) => {
  return (
    <Badge.Main>
      <Badge.Color
        style={{
          backgroundColor: bgColor,
          borderWidth: 1,
          borderColor: bdColor,
        }}
      />
      <Badge.Text>{text}</Badge.Text>
    </Badge.Main>
  );
};

const Badge = {
  Main: tw.div`
    flex
    items-center
    gap-2
  `,
  Color: tw.div`
    h-4
    w-4
    rounded
  `,
  Text: tw.div`
    text-sm
  `,
};
