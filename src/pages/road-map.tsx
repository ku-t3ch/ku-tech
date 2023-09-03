import { Text } from "@nextui-org/react";
import { Timeline } from "antd";
import { NextPage } from "next";
import { useMediaQuery } from "usehooks-ts";

interface Props {}

const roadMapData = [
  {
    title: "Tech Camp #1",
    date: "Jun 2023",
    description: "ออกค่ายสอนน้องมัธยด้าน <Code/>",
  },
  {
    title: "First Meet",
    date: "Jul 2023",
    description: "พบปะคนในกลุ่มกิจกรรม",
  },
  {
    title: "Midterm Exam 1/66",
    date: "Aug 2023",
    notMain: true,
  },
  {
    title: "Tech Talk #1",
    date: "Sep 2023",
    description: "แชร์ความรู้โดยวิทยากร (For Hackathon)",
  },
  {
    title: "UpSkill #1",
    date: "Oct 2023",
    description: "ทัศนศึกษาทักษะด้าน Tech ภายในกลุ่มกิจกรรม",
  },
  {
    title: "Final Exam 1/66",
    date: "Oct 2023",
    notMain: true,
  },
  {
    title: "Hackathon 2566",
    date: "Nov 2023",
    description: "การแข่งขันการแก้ไขปัญหาด้วยเทคโนโลยี",
  },
  {
    title: "Tech Talk #2",
    date: "Dec 2023",
    description: "แชร์ความรู้โดยวิทยากร (For Everyone)",
  },
  {
    title: "Mini Project",
    date: "Jan 2024",
    description: "นำไอเดียจาก Hackathon มาพัฒนาต่อโดยกลุ่มกิจกรรม",
  },
  {
    title: "Finish",
    date: "Mar 2024",
  },
];

const planData = [
  {
    title: "Tech Discuss",
    description: "พูดคุยด้าน Tech ร่วมกันถกข้อคิดเห็นต่าง ๆ",
    date: "Every Week",
  },
  {
    title: "Tech Space",
    description: "แชร์ความรู้ภายในสมาชิกกลุ่มกิจกรรม",
    date: "Every Month",
  },
];

const RoadMap: NextPage<Props> = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const checkMothisPassed = (month: string) => {
    const monthSplit = month.split(" ");
    const monthNumber = new Date(`${monthSplit[0]} 1, ${monthSplit[1]}`).getMonth() + 1;
    const yearNumber = new Date(`${monthSplit[0]} 1, ${monthSplit[1]}`).getFullYear();
    const nowMonthNumber = new Date().getMonth() + 1;
    const nowYearNumber = new Date().getFullYear();

    if (monthNumber === nowMonthNumber && yearNumber === nowYearNumber) {
      return false;
    }
    if (yearNumber < nowYearNumber) {
      return true;
    }
    if (monthNumber < nowMonthNumber && yearNumber === nowYearNumber) {
      return true;
    }
    return false;
  };

  return (
    <div className="mx-auto w-full max-w-[73rem] flex-col gap-10 p-5 md:flex-row md:p-10">
      <div className="flex w-full flex-col gap-5">
        <Text className="prompt self-center" b size={"$4xl"}>
          Road Map
        </Text>
        <Timeline
          mode={isMobile ? "left" : "alternate"}
          items={roadMapData.map((data) => ({
            children: (
              <div className="flex flex-col">
                <Text className="prompt" b size={"$xl"}>
                  {data.title}
                </Text>
                <Text className="prompt" size={"$md"}>
                  {data.description}
                </Text>
                <Text className="prompt" color="gray" size={"$sm"}>
                  {data.date}
                </Text>
              </div>
            ),
            color: !checkMothisPassed(data.date) ? (data.notMain ? "red" : "blue") : "gray",
          }))}
        />
      </div>
      <div className="flex w-full flex-col gap-5">
        <Text className="prompt self-center" b size={"$4xl"}>
          Plan
        </Text>
        <Timeline
          mode={isMobile ? "left" : "alternate"}
          items={planData.map((data) => ({
            children: (
              <div className="flex flex-col">
                <Text className="prompt" b size={"$xl"}>
                  {data.title}
                </Text>
                <Text className="prompt" size={"$md"}>
                  {data.description}
                </Text>
                <Text className="prompt" color="gray" size={"$sm"}>
                  {data.date}
                </Text>
              </div>
            )
          }))}
        />
      </div>
    </div>
  );
};

export default RoadMap;
