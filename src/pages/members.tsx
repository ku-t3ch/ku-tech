import AvatarComponent from "@/components/AvatarComponent";
import MembersComponent from "@/components/MembersComponent";
import { api } from "@/utils/api";
import { Avatar, Loading, Text } from "@nextui-org/react";
import clsx from "clsx";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { useState } from "react";
import useViewport from "@/hooks/useViewport"
import Xarrow from "react-xarrows";


const WithNavbar = dynamic(() => import("@/layouts/WithNavbar"), {
  ssr: false,
});

interface Props {}

const Members: NextPage<Props> = () => {
  const coreTeamApi = api.coreTeam.get.useQuery();
  const { width } = useViewport();

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

  const findTag = (name: string) => {
    return coreTeamApi.data![0]?.tags.filter((tag) => tag.name === name) || [];
  }

  return (
    <WithNavbar>
      {!coreTeamApi.isLoading ? (
        <>
          <div className="mx-auto w-full max-w-[73rem] flex-col gap-3 p-5 md:flex-row md:p-10">
          {width > 1000 ? 
              <MembersComponent findName={findName} findTag={findTag} tagName="ประธาน" id="ประธาน" headTagName="ประธาน"/> :
              // Please remove this condition and line after this when new mobile design is ready
            <div className="flex flex-col gap-[8rem]">
              
                {countUser("ฝ่ายบริหาร") > 0 && (
                  <div className="flex flex-col items-center gap-3">
                    <Text weight={"bold"} className="prompt" size={"$4xl"}>
                      ฝ่ายบริหาร
                    </Text>
                    <div className="flex flex-wrap w-full justify-center items-center gap-5">
                      {findName("ประธาน")?.map((tag, index) => (
                        <AvatarComponent
                          {...tag}
                          key={index}
                          position={"ประธาน"}
                        />
                      ))}
                    </div>
                    <div className="flex flex-wrap w-full justify-center items-center gap-5">
                      {findName("รองประธาน")?.map((tag, index) => (
                        <AvatarComponent
                          {...tag}
                          key={index}
                          position={"รองประธาน"}
                        />
                      ))}
                      {findName("เลขานุการ")?.map((tag, index) => (
                        <AvatarComponent
                          {...tag}
                          key={index}
                          position={"เลขานุการ"}
                        />
                      ))}
                      {findName("รองเลขานุการ")?.map((tag, index) => (
                        <AvatarComponent
                          {...tag}
                          key={index}
                          position={"รองเลขานุการ"}
                        />
                      ))}
                    </div>
                  </div>
                )}
                {countUser("ฝ่ายสารสนเทศ") > 0 && (
                  <div className="flex flex-col items-center gap-3">
                    <Text weight={"bold"} className="prompt" size={"$4xl"}>
                      ฝ่ายสารสนเทศ
                    </Text>
                    <div className="flex w-full flex-wrap items-center justify-center gap-5">
                      {findName("ฝ่ายสารสนเทศ")?.map((tag, index) => (
                        <AvatarComponent
                          {...tag}
                          key={index}
                          position={"ฝ่ายสารสนเทศ"}
                        />
                      ))}
                    </div>
                  </div>
                )}
                {countUser("ฝ่ายกิจกรรม") > 0 && (
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex flex-col items-center gap-3">
                      <Text weight={"bold"} className="prompt" size={"$4xl"}>
                        ฝ่ายกิจกรรม
                      </Text>
                      <div
                        className="flex flex-wrap w-full justify-center items-center gap-5"
                      >
                        {findName("ฝ่ายกิจกรรม")?.map((tag, index) => (
                          <AvatarComponent
                            {...tag}
                            key={index}
                            position={"ฝ่ายกิจกรรม"}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {countUser("ฝ่ายโสตฯ") > 0 && (
                  <div className="flex flex-col items-center gap-3">
                    <Text weight={"bold"} className="prompt" size={"$4xl"}>
                      ฝ่ายโสตฯ
                    </Text>
                    <div
                      className="flex flex-wrap w-full justify-center items-center gap-5"
                    >
                      {findName("ฝ่ายโสตฯ")?.map((tag, index) => (
                        <AvatarComponent
                          {...tag}
                          key={index}
                          position={"ฝ่ายโสตฯ"}
                        />
                      ))}
                    </div>
                  </div>
                )}
                {countUser("เหรัญญิก") > 0 && (
                  <div className="flex flex-col items-center gap-3">
                    <Text weight={"bold"} className="prompt" size={"$4xl"}>
                      เหรัญญิก
                    </Text>
                    <div
                      className="flex flex-wrap w-full justify-center items-center gap-5"
                    >
                      {findName("เหรัญญิก")?.map((tag, index) => (
                        <AvatarComponent
                          {...tag}
                          key={index}
                          position={"เหรัญญิก"}
                        />
                      ))}
                    </div>
                  </div>
                )}
                {countUser("ฝ่ายประชาสัมพันธ์") > 0 && (
                  <div className="flex flex-col items-center gap-3">
                    <Text weight={"bold"} className="prompt" size={"$4xl"}>
                      ฝ่ายประชาสัมพันธ์
                    </Text>
                    <div
                      className="flex flex-wrap w-full justify-center items-center gap-5"
                    >
                      {findName("ฝ่ายประชาสัมพันธ์")?.map((tag, index) => (
                        <AvatarComponent
                          {...tag}
                          key={index}
                          position={"ฝ่ายประชาสัมพันธ์"}
                        />
                      ))}
                    </div>
                  </div>
                )}
                {countUser("ผู้ร่วมก่อตั้ง") > 0 && (
                  <div className="flex flex-col items-center gap-3">
                    <Text weight={"bold"} className="prompt" size={"$4xl"}>
                      ผู้ร่วมก่อตั้ง
                    </Text>
                    <div
                      className="flex flex-wrap w-full justify-center items-center gap-5"
                    >
                      {findName("ผู้ร่วมก่อตั้ง")?.map((tag, index) => (
                        <AvatarComponent
                          {...tag}
                          key={index}
                          position={"ผู้ร่วมก่อตั้ง"}
                        />
                      ))}
                    </div>
                  </div>
                )}
            </div>
            }
          </div>
        </>
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
