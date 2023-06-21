import { NextPage } from "next";
import { Text } from "@nextui-org/react";

interface Props {}

const Sponsors: NextPage<Props> = () => {
  return (
    <div className="mx-auto w-full max-w-[73rem] flex-col gap-10 p-5 md:flex-row md:p-10">
      <div className="flex w-full flex-col gap-5">
        <Text className="prompt" size={"$3xl"}>
          ผู้สนับสนุน
        </Text>
        <Text className="prompt" size={"$xl"}>
          coming soon...
        </Text>
      </div>
    </div>
  );
};

export default Sponsors;
