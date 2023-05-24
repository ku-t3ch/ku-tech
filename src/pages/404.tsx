import { Text } from "@nextui-org/react";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import Lottie from "react-lottie";
import animationData from "@/assets/lottiefiles/lf20_u1xuufn3.json";

const WithNavbar = dynamic(() => import("@/layouts/WithNavbar"), {
  ssr: false,
});

interface Props {}

const _404: NextPage<Props> = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <WithNavbar>
      <div className="mx-auto max-w-[73rem] flex-col gap-10 p-5 md:flex-row md:p-10">
        <div className="flex flex-col items-center justify-center gap-5">
          <Lottie options={defaultOptions} height={400} width={400} />
          <div className="flex flex-col items-center">
            <Text className="prompt font-bold" size={"$7xl"}>
              404
            </Text>
            <Text className="prompt" size={"$2xl"}>
              Page Not Found
            </Text>
          </div>
        </div>
      </div>
    </WithNavbar>
  );
};

export default _404;
