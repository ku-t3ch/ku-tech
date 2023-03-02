import WithNavbar from "@/layouts/WithNavbar";
import { Text } from "@nextui-org/react";
import { NextPage } from "next";

interface Props {}

const Activities: NextPage<Props> = () => {
  return (
    <WithNavbar>
      <div className="mx-auto w-full max-w-[73rem] flex-col gap-10 p-5 md:flex-row md:p-10">
        <div className="flex w-full flex-col gap-5">
          <Text className="prompt" size={"$3xl"}>
            กิจกรรม
          </Text>
          <Text className="prompt" size={"$xl"}>
            - KU Hackathon : ร่วมกันระดมความคิดแก้ไขปัญหาต่าง ๆ
            ภายในมหาวิทยาลัยด้วยเทคโนโลยี
          </Text>
          <Text className="prompt" size={"$xl"}>
            - KU Tech Camp : ออกค่ายโรงเรียนมัธยมเพื่อสอนน้องด้านโค้ดเบื้องต้น
          </Text>
        </div>
      </div>
    </WithNavbar>
  );
};

export default Activities;
