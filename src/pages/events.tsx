import { Text } from "@nextui-org/react";
import { NextPage } from "next";
import dynamic from "next/dynamic";

const WithNavbar = dynamic(() => import("@/layouts/WithNavbar"), {
  ssr: false,
});

interface Props {}

const Events: NextPage<Props> = () => {
  return (
    <WithNavbar>
      <div className="mx-auto w-full max-w-[73rem] flex-col gap-10 p-5 md:flex-row md:p-10">
        <div className="flex w-full flex-col gap-5">
          <Text className="prompt" size={"$3xl"}>
            กำหนดการ
          </Text>
          <Text className="prompt" size={"$xl"}>
            coming soon...
          </Text>
        </div>
      </div>
    </WithNavbar>
  );
};

export default Events;
