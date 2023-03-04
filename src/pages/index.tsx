import { type NextPage } from "next";
import { Button, Text } from "@nextui-org/react";
import Image from "next/image";
import clsx from "clsx";
import Logo from "@/assets/logo.png";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useRef } from "react";
import dynamic from "next/dynamic";
import JoinClubBtn from "@/components/JoinClubBtn";

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
  return (
    <WithNavbar>
      <div className=" mx-auto h-full max-w-[73rem] p-5 md:p-10">
        <div className="flex h-[80%] flex-col items-center justify-center gap-5">
          <div className="absolute top-0 right-0 left-0 bottom-0 z-0 w-full">
            <img
              className="h-full w-full animate-pulse object-cover duration-75"
              src="/backgrounds/v1_d.svg"
              alt=""
            />
          </div>

          <div className="relative z-10 flex justify-center">
            <Image src={Logo} alt="logo" width={400}></Image>
          </div>
          {/* <Button
            onClick={() =>
              content.current?.scrollIntoView({ behavior: "smooth" })
            }
            size={"lg"}
            bordered
            shadow
            color="gradient"
            auto
            className="z-0"
          >
            <ArrowDownwardIcon className="-z-50 animate-bounce duration-500" />
          </Button> */}
          <div><JoinClubBtn /></div>
        </div>
        {/* <div
          ref={content}
          className="z-10 flex-col items-center gap-10 md:flex-row"
        >
          <Content
            content="สร้างโอกาสให้สมาชิกเรียนรู้ด้วยกัน: จัดกิจกรรมเช่นการสนทนาเกี่ยวกับเทคโนโลยี หรือการเล่าประสบการณ์ในการทำงานด้านเทคโนโลยี เพื่อให้สมาชิกได้เรียนรู้และแลกเปลี่ยนความรู้ด้วยกัน"
            image="https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            position="right"
          />
          <Content
            content="ฝึกทักษะด้านเทคโนโลยี: จัดกิจกรรมเช่น workshop หรือสัมมนาเพื่อเสริมสร้างทักษะในการเขียนโปรแกรม การพัฒนาแอปพลิเคชัน หรือการสร้างเว็บไซต์ เป็นต้น"
            image="https://images.unsplash.com/photo-1638029202288-451a89e0d55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            position="left"
          />
          <Content
            content="สร้างโอกาสให้สมาชิกเรียนรู้และพัฒนาทักษะการทำงานเป็นทีม: จัดกิจกรรม เช่น การทำงานเป็นทีมผ่าน Mini Project เหรือการจัดทำงานวิจัยเพื่อสร้างโอกาสให้สมาชิกได้เรียนรู้และพัฒนาทักษะการทำงานเป็นทีมด้วยกัน"
            image="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1771&q=80"
            position="right"
          />
          <Content
            content="สร้างโอกาสให้สมาชิกเข้าร่วมโครงการและการแข่งขันทางเทคโนโลยี: จัดการแข่งขันเช่น hackathon หรือการพัฒนาแอปพลิเคชัน เพื่อสร้างแรงบันดาลใจและการเรียนรู้ร่วมกันในทีม"
            image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            position="left"
          />
        </div> */}
      </div>
    </WithNavbar>
  );
};

export default Home;
