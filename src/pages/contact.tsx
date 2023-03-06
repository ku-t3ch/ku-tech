import { Text } from "@nextui-org/react";
import { NextPage } from "next";
import dynamic from "next/dynamic";

const WithNavbar = dynamic(() => import("@/layouts/WithNavbar"), {
  ssr: false,
});

interface Props {}

const Contact: NextPage<Props> = () => {
  return (
    <WithNavbar>
      <div className="mx-auto w-full max-w-[73rem] flex-col gap-10 p-5 md:flex-row md:p-10">
        <div className="flex w-full flex-col gap-5">
          <Text className="prompt" size={"$3xl"}>
            ติดต่อเรา
          </Text>
          <Text className="prompt" size={"$xl"}>
            Discord Group : <a href="https://discord.gg/daxY4By4DV" target="_blank">https://discord.gg/daxY4By4DV</a>
          </Text>
          <Text className="prompt" size={"$xl"}>
            Email : <a href="mailto:ku.t3ch@gmail.com">ku.t3ch@gmail.com</a>
          </Text>
        </div>
      </div>
    </WithNavbar>
  );
};

export default Contact;
