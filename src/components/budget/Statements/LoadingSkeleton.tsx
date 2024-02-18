import { FC } from "react";
import { Collapse, Avatar } from "@nextui-org/react";
import tw from "tailwind-styled-components";

interface Props {}

const LoadingSkeleton: FC<Props> = () => {
  return (
    <>
      {[...Array(3)].map((_, idx) => {
        return (
          <Collapse
            key={idx}
            divider
            title={<Title />}
            subtitle={<Subtitle />}
            contentLeft={
              <Avatar size="lg" color="gradient" className="animate-pulse" bordered squared />
            }
            disabled
          />
        );
      })}
    </>
  );
};

const Background = tw.div`
  animate-pulse
  bg-[#282C30]
  rounded
`;

const Title = tw(Background)`
  mb-[.8rem]
  h-4
  w-[9rem]
  md:w-[12rem]
`;

const Subtitle = tw(Background)`
  h-3
  w-[90%]
  md:w-[18rem]
`;

export default LoadingSkeleton;
