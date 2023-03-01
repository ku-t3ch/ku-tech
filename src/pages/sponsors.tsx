import WithNavbar from "@/layouts/WithNavbar";
import { Text } from "@nextui-org/react";
import { NextPage } from "next";

interface Props {}

const Sponsors: NextPage<Props> = () => {
  return (
    <WithNavbar>
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
    </WithNavbar>
  );
};

export default Sponsors;
