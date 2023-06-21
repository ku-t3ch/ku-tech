import actData from "@/assets/activities.json";

import { NextPage } from "next";
import { Text } from "@nextui-org/react";

interface Props {}

const Activities: NextPage<Props> = () => {
  return (
    <div className="mx-auto w-full max-w-[73rem] flex-col gap-10 p-5 md:flex-row md:p-10">
      <div className="flex w-full flex-col gap-5">
        <Text className="prompt" size={"$3xl"}>
          กิจกรรม
        </Text>

        {actData.map((item, index) => (
          <div key={index}>
            <Text className="prompt" size={"$xl"}>
              {item.title} : {item.description}
            </Text>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activities;
