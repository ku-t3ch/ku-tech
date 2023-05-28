import AvatarComponent from "@/components/AvatarComponent";
import { api } from "@/utils/api";
import { Avatar, Loading, Text } from "@nextui-org/react";
import clsx from "clsx";
import { NextPage } from "next";
import dynamic from "next/dynamic";

const WithNavbar = dynamic(() => import("@/layouts/WithNavbar"), {
  ssr: false,
});

interface Props {}

const Members: NextPage<Props> = () => {
  const coreTeamApi = api.coreTeam.get.useQuery();

  const findName = (name: string) => {
    return (
      coreTeamApi.data![0]?.tags.filter((tag) => tag.name === name)![0]
        ?.request_user || []
    );
  };

  const countUser = (name: string) => {
    return (
      coreTeamApi.data![0]?.tags.filter((tag) => tag.name === name)![0]
        ?.request_user.length || 0
    );
  };

  return (
    <WithNavbar>
      {!coreTeamApi.isLoading ? (
        <div className="mx-auto w-full max-w-[73rem] flex-col gap-3 p-5 md:flex-row md:p-10">
          <div className="flex flex-col gap-14">
            <div className="flex flex-col items-center justify-center gap-3">
              <Text
                
                weight={"bold"}
                className="prompt"
                size={"$4xl"}
              >
                ฝ่ายบริหาร
              </Text>
              <div className="grid w-full grid-cols-1 items-center gap-5">
                {findName("ประธาน")?.map((tag,index) => (
                  <AvatarComponent {...tag} key={index} position={"ประธาน"} />
                ))}
              </div>
              <div className="grid w-full grid-cols-1 items-center gap-5 sm:grid-cols-2 md:grid-cols-3">
                {findName("รองประธาน")?.map((tag,index) => (
                  <AvatarComponent {...tag} key={index} position={"รองประธาน"} />
                ))}
                {findName("เลขานุการ")?.map((tag,index) => (
                  <AvatarComponent {...tag} key={index} position={"เลขานุการ"} />
                ))}
                {findName("รองเลขานุการ")?.map((tag,index) => (
                  <AvatarComponent {...tag} key={index} position={"รองเลขานุการ"} />
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center gap-3">
              <Text
                
                weight={"bold"}
                className="prompt"
                size={"$4xl"}
              >
                ฝ่ายสารสนเทศ
              </Text>
              <div
                className={clsx(
                  "grid w-full items-center gap-5",
                  countUser("ฝ่ายสารสนเทศ") === 1
                    ? "grid-cols-1"
                    : countUser("ฝ่ายสารสนเทศ") === 2
                    ? "sm:grid-cols-2"
                    : countUser("ฝ่ายสารสนเทศ") >= 3
                    ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
                    : ""
                )}
              >
                {findName("ฝ่ายสารสนเทศ")?.map((tag,index) => (
                  <AvatarComponent {...tag} key={index} position={"ฝ่ายสารสนเทศ"} />
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Text
                
                weight={"bold"}
                className="prompt"
                size={"$4xl"}
              >
                ฝ่ายกิจกรรม
              </Text>
              <div
                className={clsx(
                  "grid w-full items-center gap-5",
                  countUser("ฝ่ายกิจกรรม") === 1
                    ? "grid-cols-1"
                    : countUser("ฝ่ายกิจกรรม") === 2
                    ? "sm:grid-cols-2"
                    : countUser("ฝ่ายกิจกรรม") >= 3
                    ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
                    : ""
                )}
              >
                {findName("ฝ่ายกิจกรรม")?.map((tag,index) => (
                  <AvatarComponent {...tag} key={index} position={"ฝ่ายกิจกรรม"} />
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Text
                
                weight={"bold"}
                className="prompt"
                size={"$4xl"}
              >
                ฝ่ายโสตฯ
              </Text>
              <div
                className={clsx(
                  "grid w-full items-center gap-5",
                  countUser("ฝ่ายโสตฯ") === 1
                    ? "grid-cols-1"
                    : countUser("ฝ่ายโสตฯ") === 2
                    ? "sm:grid-cols-2"
                    : countUser("ฝ่ายโสตฯ") >= 3
                    ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
                    : ""
                )}
              >
                {findName("ฝ่ายโสตฯ")?.map((tag,index) => (
                  <AvatarComponent {...tag} key={index} position={"ฝ่ายโสตฯ"} />
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Text
                
                weight={"bold"}
                className="prompt"
                size={"$4xl"}
              >
                เหรัญญิก
              </Text>
              <div
                className={clsx(
                  "grid w-full items-center gap-5",
                  countUser("เหรัญญิก") === 1
                    ? "grid-cols-1"
                    : countUser("เหรัญญิก") === 2
                    ? "sm:grid-cols-2"
                    : countUser("เหรัญญิก") >= 3
                    ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
                    : ""
                )}
              >
                {findName("เหรัญญิก")?.map((tag,index) => (
                  <AvatarComponent {...tag} key={index} position={"เหรัญญิก"} />
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Text
                
                weight={"bold"}
                className="prompt"
                size={"$4xl"}
              >
                ฝ่ายประชาสัมพันธ์
              </Text>
              <div
                className={clsx(
                  "grid w-full items-center gap-5",
                  countUser("ฝ่ายประชาสัมพันธ์") === 1
                    ? "grid-cols-1"
                    : countUser("ฝ่ายประชาสัมพันธ์") === 2
                    ? "sm:grid-cols-2"
                    : countUser("ฝ่ายประชาสัมพันธ์") >= 3
                    ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
                    : ""
                )}
              >
                {findName("ฝ่ายประชาสัมพันธ์")?.map((tag,index) => (
                  <AvatarComponent {...tag} key={index} position={"ฝ่ายประชาสัมพันธ์"} />
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Text
                
                weight={"bold"}
                className="prompt"
                size={"$4xl"}
              >
                ผู้ร่วมก่อตั้ง
              </Text>
              <div
                className={clsx(
                  "grid w-full items-center gap-5",
                  countUser("ผู้ร่วมก่อตั้ง") === 1
                    ? "grid-cols-1"
                    : countUser("ผู้ร่วมก่อตั้ง") === 2
                    ? "sm:grid-cols-2"
                    : countUser("ผู้ร่วมก่อตั้ง") >= 3
                    ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
                    : ""
                )}
              >
                {findName("ผู้ร่วมก่อตั้ง")?.map((tag,index) => (
                  <AvatarComponent {...tag} key={index} position={"ผู้ร่วมก่อตั้ง"} />
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-screen flex-col items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Text className="prompt" size={"$4xl"}>
              <Loading size="lg" />
            </Text>
          </div>
        </div>
      )}
    </WithNavbar>
  );
};

export default Members;
