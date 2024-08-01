import { Text } from "@nextui-org/react";
import { Timeline } from "antd";
import { NextPage } from "next";
import { useMediaQuery } from "usehooks-ts";

interface Props {}

const roadMapData = [
  {
    title: "Internship 2567",
    date: "Apr 2024",
    description: "การฝึกงาน ณ สำนักบริการคอมพิวเตอร์",
  },
  {
    title: "Tech Camp #2",
    date: "Jun 2024",
    description: "ค่ายสอน <Code/> มัธยมสร้างแอปพลิเคชัน (Flutter)",
  },
  {
    title: "First Meet",
    date: "Jul 2024",
    description: "พบปะคนในกลุ่มกิจกรรม",
  },
  {
    title: "Tech Camp #3",
    date: "Jul 2024",
    description: "ค่ายสอน <Code/> มัธยมLogical Thinking*",
  },
  {
    title: "Midterm Exam 1/67",
    date: "Aug 2024",
    notMain: true,
  },
  {
    title: "Tech Talk 2567",
    date: "Sep 2024",
    description: "แชร์ความรู้โดยวิทยากร",
  },
  {
    title: "Upskills #2",
    date: "Oct 2024",
    description: "พัฒนาสกิลด้านเทคโนโลยี",
  },
  {
    title: "Final Exam 1/67",
    date: "Oct 2024",
    notMain: true,
  },
  {
    title: "Hackathon 2567",
    date: "Nov 2024",
    description: "Low Cabon in KU",
  },
  {
    title: "Tech Talk 2567",
    date: "Dec 2024",
    description: "แชร์ความรู้โดยวิทยากร",
  },
  {
    title: "Midterm Exam 1/68",
    date: "Jan 2025",
    notMain: true,
  },
  {
    title: "Valentines 2568",
    date: "Feb 2025",
    description: "Special valentines",
  },
  {
    title: "Mini Project",
    date: "Mar 2025",
    description: "นำไอเดียจาก Hackathon ไปพัฒนาต่อ",
  },
  {
    title: "Finish",
    date: "Mar 2025",
  },
];

// const planData = [
//   {
//     title: "Tech Discuss",
//     description: "พูดคุยด้าน Tech ร่วมกันถกข้อคิดเห็นต่าง ๆ",
//     date: "Every Week",
//   },
//   {
//     title: "Tech Space",
//     description: "แชร์ความรู้ภายในสมาชิกกลุ่มกิจกรรม",
//     date: "Every Month",
//   },
// ];

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
      {/* <div className="flex w-full flex-col gap-5">
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
      </div> */}
    </div>
  );
};

export default RoadMap;
