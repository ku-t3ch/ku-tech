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
          {/* <Text className="prompt" size={"$xl"}>
            Line Group Member : <a href="https://line.me/ti/g/mpcZOXKJaN" target="_blank">https://line.me/ti/g/mpcZOXKJaN</a>
          </Text> */}
          <Text className="prompt" size={"$xl"}>
            Email : <a href="mailto:tech.kuclub@gmail.com">tech.kuclub@gmail.com</a>
          </Text>
        </div>
      </div>
    </WithNavbar>
  );
};

export default Contact;
