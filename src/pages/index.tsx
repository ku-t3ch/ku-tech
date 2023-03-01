import { type NextPage } from "next";
import { Text } from "@nextui-org/react";
import Image from "next/image";
import WithNavbar from "@/layouts/WithNavbar";
import clsx from "clsx";
import Logo from "@/assets/logo.png";

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
  return (
    <WithNavbar>
      <div className="mx-auto max-w-[73rem] p-5 md:p-10">
        <div className="flex justify-center">
            <Image src={Logo} alt="logo" width={400}></Image>
        </div>
        <div className="flex-col items-center gap-10 md:flex-row">
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
        </div>
      </div>
    </WithNavbar>
  );
};

export default Home;
