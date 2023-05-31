import { Metadata, type NextPage } from "next";
import { Text } from "@nextui-org/react";
import Image from "next/image";
import clsx from "clsx";
import { NextSeo } from "next-seo";
import Logo from "@/assets/KU-TECH-Logo-TW.png";
import { useRef } from "react";
import dynamic from "next/dynamic";
import JoinClubBtn from "@/components/JoinClubBtn";
import SeoGlobal from "@/components/SeoGlobal";
import { css } from "@emotion/css";
import ActivityCard from "@/components/home/ActivityCard";
import MonitorIcon from "@mui/icons-material/Monitor";
import { Icon } from "@iconify/react";

const WithNavbar = dynamic(() => import("@/layouts/WithNavbar"), {
  ssr: false,
});

interface PropsContent {
  image: string;
  content: string;
  position: "left" | "right";
}

const Content: NextPage<PropsContent> = (props) => {
  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center gap-10",
        props.position === "right" ? "md:flex-row" : "md:flex-row-reverse"
      )}
    >
      <div style={{ width: "100%", height: "20rem", position: "relative" }}>
        <Image alt="" layout="fill" objectFit="contain" src={props.image} />
      </div>
      <Text size={"$2xl"} className="prompt">
        {props.content}
      </Text>
    </div>
  );
};

const Home: NextPage = () => {
  const content = useRef<HTMLDivElement>(null);

  const activitys = [
    {
      icon: (
        <Icon
          icon="material-symbols:keyboard-double-arrow-up-rounded"
          className="text-[4rem]"
        />
      ),
      title: "Tech Upskill",
      content:
        "อบรมสมาชิกด้านเทคโนโลยีต่าง ๆ ที่น่าสนใจ และเป็นประโยชน์ต่อนิสิต",
    },
    {
      icon: (
        <Icon
          icon="material-symbols:directions-bus-outline"
          className="text-[4rem]"
        />
      ),
      title: "KU Tech Camp",
      content: "ออกค่ายโรงเรียนมัธยมเพื่อสอนน้องด้านโค้ดเบื้องต้น",
    },
    {
      icon: (
        <Icon
          icon="material-symbols:interpreter-mode-outline"
          className="text-[4rem]"
        />
      ),
      title: "KU Tech Talk",
      content:
        "การเสวนาทางวิชาการ ในหัวข้อด้านเทคโนโลยีที่น่าสนใจในปัจจุบัน และเป็นประโยชน์ในทุกคณะ, สาขา",
    },
    {
      icon: (
        <Icon icon="material-symbols:code-rounded" className="text-[4rem]" />
      ),
      title: "KU Hackathon",
      content:
        "ร่วมกันระดมความคิดแก้ไขปัญหาต่าง ๆ ภายในมหาวิทยาลัยด้วยเทคโนโลยี",
    },
  ];

  return (
    <>
      <WithNavbar>
        <div className="mx-auto min-h-screen max-w-[73rem] p-5 md:p-10">
          <div className="h-full">
            <div className="flex h-[80%] flex-col items-center justify-center gap-5">
              <div className="absolute top-0 right-0 left-0 bottom-0 z-0 w-full">
                <div
                  className={css`
                    background: linear-gradient(
                      180deg,
                      #112b3a 0%,
                      rgba(61, 23, 90, 0) 85.69%
                    );
                    height: 100%;
                  `}
                ></div>
              </div>

              <div className="relative z-10 flex justify-center">
                <Image src={Logo} alt="logo" width={400}></Image>
              </div>
              <div>
                <JoinClubBtn />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[3rem] pb-[5rem] sm:gap-[5rem] md:gap-[10rem]">
            <div className="z-10 flex-col items-center">
              <div className="flex flex-col items-center gap-10 md:flex-row">
                {/* <img
                  className="h-[20rem] w-[20rem] rounded-xl object-cover"
                  src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=2070&q=80"
                  alt=""
                /> */}
                {/* <div className="hidden flex-1 md:block ">
                  <Icon
                    icon="material-symbols:info-outline"
                    className="text-[18rem] "
                  />
                </div> */}

                <div className="flex flex-col items-center  gap-3">
                  <Text b size={"$4xl"}>
                      <span className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
                        เกี่ยวกับ KU Tech
                      </span>
                  </Text>
                  <div className="text-lg">
                    KU Tech คือ
                    การรวมกลุ่มนิสิตที่มีความสนใจด้านเทคโนโลยีเข้าด้วยกันเพื่อสร้างและพัฒนาเทคโนโลยีที่สามารถใช้งานได้จริงและสร้างประโยชน์ต่อมหาวิทยาลัยและสังคม
                    โดยให้เน้นการพัฒนาศักยภาพของนิสิตด้านเทคโนโลยี
                    นอกจากนี้ยังเป็นที่รวบรวมนิสิตที่มีความสนใจด้านเทคโนโลยีเพื่อสร้างพื้นที่ในการแลกเปลี่ยนความรู้
                    และสร้างความสัมพันธ์ที่ดีกันระหว่างนิสิตในชมรม KU Tech
                    อีกด้วย
                  </div>
                </div>
              </div>
            </div>
            <div className="z-10 flex-col items-center">
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
            </div>
            <div className="z-10 flex-col items-center">
              <div className="flex flex-col items-center justify-center gap-5">
                <Text b size={"$2xl"}>
                  ช่องทางติดต่อ
                </Text>
                <div className="flex gap-5 text-white">
                  <Icon
                    icon="ic:baseline-facebook"
                    className="text-[4rem] text-white "
                  />
                  <Icon
                    icon="mdi:instagram"
                    className="text-[4rem] text-white "
                  />
                  <Icon
                    icon="ic:baseline-tiktok"
                    className="text-[4rem] text-white "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </WithNavbar>
    </>
  );
};

export default Home;
