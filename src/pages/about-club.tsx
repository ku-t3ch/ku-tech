import { Text } from "@nextui-org/react";
import { NextPage } from "next";
import dynamic from "next/dynamic";

const WithNavbar = dynamic(() => import("@/layouts/WithNavbar"), {
  ssr: false,
});

interface Props {}

const AboutClub: NextPage<Props> = () => {
  return (
    <WithNavbar>
      <div className="mx-auto flex max-w-[73rem] flex-col gap-10 md:gap-20 p-5 md:p-10">
        <div className="flex flex-col gap-3">
          <Text className="prompt" size={"$3xl"}>
            เกี่ยวกับชมรม
          </Text>
          <Text className="prompt" size={"$xl"}>
            KU Tech คือ
            การรวมกลุ่มนิสิตที่มีความสนใจด้านเทคโนโลยีเข้าด้วยกันเพื่อสร้างและพัฒนาเทคโนโลยีที่สามารถใช้งานได้จริงและสร้างประโยชน์ต่อมหาวิทยาลัยและสังคม
            โดยให้เน้นการพัฒนาศักยภาพของนิสิตด้านเทคโนโลยี
            นอกจากนี้ยังเป็นที่รวบรวมนิสิตที่มีความสนใจด้านเทคโนโลยีเพื่อสร้างพื้นที่ในการแลกเปลี่ยนความรู้
            และสร้างความสัมพันธ์ที่ดีกันระหว่างนิสิตในชมรม KU Tech อีกด้วย
          </Text>
        </div>
        <div className="flex flex-col gap-3">
          <Text className="prompt" size={"$2xl"}>
            วัตถุประสงค์
          </Text>
          <Text className="prompt" size={"$xl"}>
            เพื่อรวบรวมนิสิตจากทุกคณะสาขาที่สนใจด้านเทคโนโลยี
            มาระดมความคิดร่วมกันแก้ปัญหา (Hackathon) ต่าง ๆ
            โดยใช้องค์ความรู้จากสาขาที่ตนเองถนัดเช่น ด้านการบริการธุรกิจ,
            ด้านวิศวกรรม แล้วนำมาสร้าง Product ให้เกิดขึ้นและใช้งานได้จริง
            พร้อมเผยแพร่ความรู้ด้านเทคโนโลยีสู่สังคม
          </Text>
        </div>
      </div>
    </WithNavbar>
  );
};

export default AboutClub;
