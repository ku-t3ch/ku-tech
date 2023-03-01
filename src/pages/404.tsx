import WithNavbar from "@/layouts/WithNavbar";
import { Text } from "@nextui-org/react";
import { NextPage } from "next";

interface Props {}

const _404: NextPage<Props> = () => {
  return (
    <WithNavbar>
      <div className="mx-auto max-w-[73rem] flex-col gap-10 p-5 md:flex-row md:p-10">
        <div className="flex flex-col gap-5">
          <Text className="prompt" size={"$3xl"}>
            Page not found 😢
          </Text>
        </div>
      </div>
    </WithNavbar>
  );
};

export default _404;
