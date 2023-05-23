import { Text } from "@nextui-org/react";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import LogoIcon from "@/assets/logo.png";
import Image from "next/image";

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

          <Text className="prompt" size={"$2xl"}>
            Website : <a href="https://kutech.club">kutech.club</a><br/>
            Email : <a href="mailto:ku.t3ch@gmail.com">ku.t3ch@gmail.com</a><br/>
            Ig : <a href="https://instagram.com/ku.t3ch" target="_blank">ku.t3ch</a><br/>
            Facebook : <a href="https://www.facebook.com/profile.php?id=100090902166797" target="_blank">KU Tech</a><br/>
            Discord : <a href="https://kutech.club/g/DPeocrV" target="_blank">KU Tech</a>
          </Text>

        </div>
      </div>
    </WithNavbar>
  );
};

export default Contact;