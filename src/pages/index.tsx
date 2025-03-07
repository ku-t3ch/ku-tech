import Image from "next/image";
import Logo from "@/assets/KU-TECH-Logo-TW.png";

import { type NextPage } from "next";

import { css } from "@emotion/css";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { Text } from "@nextui-org/react";

import Footer from "@/components/Footer";
import JoinClubBtn from "@/components/JoinClubBtn";
import ActivityCard from "@/components/home/ActivityCard";
import ImageCarousel from "@/components/home/ImageCarousel";
import { Tooltip } from "antd";
import Partner from "@/components/home/Partner";
import Sponsor from "@/components/home/Sponsor";
import TikTokIcon from "@/components/TikTokIcon";
import Lab from "@/components/home/Lab";
import Company from "@/components/home/Company";

const activitys = [
  {
    icon: <Icon icon="material-symbols:keyboard-double-arrow-up-rounded" className="text-[4rem]" />,
    title: "UpSkills",
    content: "ทัศนศึกษาศูนย์เทคโนโลยีทั่วประเทศไทย เพื่อพัฒนาองค์ความรู้นิสิตนอกห้องเรียน",
  },
  {
    icon: <Icon icon="material-symbols:directions-bus-outline" className="text-[4rem]" />,
    title: "Tech Camp",
    content: "ค่ายให้ความรู้ด้านเทคโนโลยีกับน้อง ๆ ระดับมัธยมศึกษา ลดความเลื่อมล่ำทางการศึกษา เปิดโอกาสทุกคนเข้าสู่โลกเทคโนโลยี",
    href: "https://camp.tech.nisit.ku.ac.th",
  },
  {
    icon: <Icon icon="material-symbols:interpreter-mode-outline" className="text-[4rem]" />,
    title: "Tech Talk",
    content:
      "อบรมเชิงปฏิบัติการในหัวข้อด้านเทคโนโลยีที่น่าสนใจในปัจจุบัน อันจะเป็นประโยชน์แก่นิสิตในทุกคณะ, สาขา",
  },
  {
    icon: <Icon icon="material-symbols:code-rounded" className="text-[4rem]" />,
    title: "KU Hackathon",
    content: "ร่วมกันระดมความคิดแก้ไขปัญหาต่าง ๆ ภายในมหาวิทยาลัยเกษตรศาสตร์ด้วยเทคโนโลยี",
    href: "https://hackathon.ku.ac.th",
  },
];

const cssImageGrid = css`
  /* background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoAQMAAAC2MCouAAAABlBMVEWBgYFHcEyMaNnGAAAAAnRSTlP/AOW3MEoAAAAQSURBVHgBY4CA+v9AMBJIALryrr41QoYVAAAAAElFTkSuQmCC"); */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='23px' height='23px' viewBox='0 0 23 23' fill='none'%3E%3Ccircle cx='22' cy='22' r='0.88' fill='rgba(115, 115, 115, 0.218)' /%3E%3C/svg%3E%0A");
  height: 100%;
  z-index: 10;
  /* opacity: 0.08; */
`;

const cssColorGradient = css`
  background: linear-gradient(180deg, #11283a 0%, rgba(61, 23, 90, 0) 85.69%);
  height: 100%;
  z-index: 0;
`;

const Home: NextPage = () => {
  return (
    <>
      <div className="mx-auto min-h-screen max-w-[73rem] p-5 md:p-10">
        <div className="h-full">
          <div className="flex h-[80%] flex-col items-center justify-center gap-5">
            <div className="absolute top-0 right-0 left-0 bottom-0 z-0 w-full">
              <div className={cssColorGradient}>
                <div className={cssImageGrid}></div>
              </div>
            </div>

            <div className="relative z-10 flex justify-center">
              <Image src={Logo} alt="logo" width={400}></Image>
            </div>
            <div>
              {/* <JoinClubBtn /> */}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[3rem] pb-[5rem] sm:gap-[5rem] md:gap-[10rem]">
          <div className="z-10 flex-col items-center">
            <div className="flex flex-col items-center gap-10 md:flex-row">
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="flex flex-col items-start gap-3 md:items-center"
              >
                <Text b className=" text-[2rem] transition-all duration-200 md:text-[3rem]">
                  KU Tech คืออะไร ?
                </Text>
                <div className="text-[1.2rem] md:text-[1.5rem]">
                  KU Tech คือ
                  การรวมกลุ่มนิสิตที่มีความสนใจด้านเทคโนโลยีเข้าด้วยกันเพื่อสร้างและพัฒนาเทคโนโลยีที่สามารถใช้งานได้จริงและสร้างประโยชน์ต่อมหาวิทยาลัยและสังคม
                  โดยให้เน้นการพัฒนาศักยภาพของนิสิตด้านเทคโนโลยี
                  นอกจากนี้ยังเป็นที่รวบรวมนิสิตที่มีความสนใจด้านเทคโนโลยีเพื่อสร้างพื้นที่ในการแลกเปลี่ยนความรู้
                  และสร้างความสัมพันธ์ที่ดีกันระหว่างนิสิตในกลุ่ม KU Tech อีกด้วย
                </div>
              </motion.div>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="z-10 flex-col items-center"
          >
            <div className="flex flex-col items-center justify-center gap-5">
              <Text b size={"$4xl"}>
                กิจกรรม
              </Text>
              <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
                {activitys.map((activity, index) => (
                  <ActivityCard {...activity} key={index} />
                ))}
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="z-10 flex-col items-center"
          >
            <div className="flex flex-col items-center justify-center gap-5">
              <Text b size={"$4xl"}>
                ภาพถ่ายกิจกรรม
              </Text>
              <ImageCarousel />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="z-10 flex-col items-center"
          >
            <Company />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="z-10 flex-col items-center"
          >
            <Partner />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="z-10 flex-col items-center"
          >
            <Lab />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="z-10 flex-col items-center"
          >
            <Sponsor />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="z-10 flex-col items-center"
          >
            <div className="flex flex-col items-center justify-center gap-5">
              <Text b size={"$2xl"} className="">
                ช่องทางติดต่อ
              </Text>
              <div className="flex gap-5 text-white">
                <a href="https://www.facebook.com/profile.php?id=100090902166797" target="_blank">
                  <Icon icon="ic:baseline-facebook" className="text-[4rem] text-white " />
                </a>
                <a href="https://instagram.com/ku.t3ch" target="_blank">
                  <Icon icon="mdi:instagram" className="text-[4rem] text-white " />
                </a>
                <a href="http://www.tiktok.com/@ku.t3ch" target="_blank">
                  <TikTokIcon className="text-[4rem] text-white"/>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
