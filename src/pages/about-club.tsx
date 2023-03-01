import WithNavbar from "@/layouts/WithNavbar";
import { Text } from "@nextui-org/react";
import { NextPage } from "next";

interface Props {}

const AboutClub: NextPage<Props> = () => {
  return (
    <WithNavbar>
      <div className="mx-auto max-w-[73rem] flex-col gap-10 p-5 md:flex-row md:p-10">
        <div className="flex flex-col gap-5">
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
          <div className="flex flex-col">
            <Text className="prompt" size={"$2xl"}>
              วัตถุประสงค์
            </Text>
            <Text className="prompt" size={"$xl"}>
              - เพื่อพัฒนาศักยภาพนิสิตจากทุกคณะ ที่สนใจด้านเทคโนโลยี
            </Text>
            <Text className="prompt" size={"$xl"}>
              - ฝึกกระบวนการคิด การแก้ไขปัญหาต่าง ๆ ด้วยเทคโนโลยี
            </Text>
            <Text className="prompt" size={"$xl"}>
              - ฝึกกระบวนการทำงานเป็นทีม และการแก้ไขปัญหาอย่างมีระบบ
            </Text>
          </div>
        </div>
      </div>
    </WithNavbar>
  );
};

export default AboutClub;
