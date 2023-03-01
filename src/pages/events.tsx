import WithNavbar from "@/layouts/WithNavbar";
import { Text } from "@nextui-org/react";
import { NextPage } from "next";

interface Props {}

const Events: NextPage<Props> = () => {
  return (
    <WithNavbar>
      <div className="mx-auto max-w-[73rem] flex-col gap-10 p-5 md:flex-row md:p-10 w-full">
        <div className="flex flex-col gap-5 w-full">
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
