import AvatarComponent from "@/components/AvatarComponent";
import MembersComponent from "@/components/MembersComponent";
import { api } from "@/utils/api";
import { Loading, Text } from "@nextui-org/react";
import { NextPage } from "next";
import useViewport from "@/hooks/useViewport";
import Xarrow, { useXarrow, Xwrapper } from "react-xarrows";

interface Props {}

const Members: NextPage<Props> = () => {
  const coreTeamApi = api.coreTeam.get.useQuery();

  const { width } = useViewport();

  const findName = (name: string) => {
    if (coreTeamApi.data === undefined) {
      return [];
    }
    return coreTeamApi.data![0]?.tags.filter((tag) => tag.name === name)![0]?.request_user || [];
  };

  const countUser = (name: string) => {
    return (
      coreTeamApi.data![0]?.tags.filter((tag) => tag.name === name)![0]?.request_user.length || 0
    );
  };

  // const findTag = (name: string) => {
  //   if (coreTeamApi.data === undefined) {
  //     return [];
  //   }
  //   return coreTeamApi.data![0]?.tags.filter((tag) => tag.name === name) || [];
  // };

  return (
    <>
      <div className="flex flex-col items-center gap-3 mt-10">
        <Text weight={"bold"} className="prompt" size={"$4xl"}>
          อาจารย์ที่ปรึกษา
        </Text>
        <div className="flex w-full flex-wrap items-center justify-center gap-5">
          <AvatarComponent
            href="https://www.linkedin.com/in/usa-sammapun/"
            core_team_profile_image_path={
              "https://s3.tech.nisit.ku.ac.th/assets/professor/usa.jpeg"
            }
            first_name_th="ผศ.ดร.อุษา สัมมาพันธ์"
            position={"อาจารย์ที่ปรึกษา"}
            major="วิทยาการคอมพิวเตอร์"
          />
          <AvatarComponent
            core_team_profile_image_path={
              "https://s3.tech.nisit.ku.ac.th/assets/professor/chaiporn.jpg"
            }
            first_name_th="ผศ.ดร.ชัยพร ใจแก้ว"
            position={"อาจารย์ที่ปรึกษา"}
            major="วิศวกรรมคอมพิวเตอร์"
          />
          <AvatarComponent
            core_team_profile_image_path={
              "https://s3.tech.nisit.ku.ac.th/assets/professor/thepparit.jpeg"
            }
            first_name_th="รศ.ดร.เทพฤทธิ์ บัณฑิตวัฒนาวงศ์"
            position={"อาจารย์ที่ปรึกษา"}
            major="วิทยาการคอมพิวเตอร์"
          />
        </div>
        <div className="flex w-full flex-wrap-reverse items-center justify-center gap-5">
          <AvatarComponent
            core_team_profile_image_path={
              "https://s3.tech.nisit.ku.ac.th/assets/professor/thammakorn.jpeg"
            }
            first_name_th="ผศ.ดร.ธรรมกร แซ่ตั้ง"
            position={"อาจารย์ที่ปรึกษา"}
            major="วิทยาการคอมพิวเตอร์"
          />
          <AvatarComponent
            core_team_profile_image_path={
              "https://s3.tech.nisit.ku.ac.th/assets/professor/sethavidh.jpeg"
            }
            first_name_th="ผศ.ดร.เสฎฐวิทย์ เกิดผล"
            position={"อาจารย์ที่ปรึกษา"}
            major="วิทยาการคอมพิวเตอร์"
          />
          <AvatarComponent
            core_team_profile_image_path={
              "https://s3.tech.nisit.ku.ac.th/assets/professor/pannapat.jpeg"
            }
            first_name_th="อ.พรรณภัทร์ จันทร์ไพแสง"
            position={"อาจารย์ที่ปรึกษา"}
            major="วิทยาการคอมพิวเตอร์"
          />
        </div>
      </div>
      {!coreTeamApi.isLoading ? (
        <>
          <div className="mx-auto w-full max-w-[80rem] flex-col gap-3 p-5 md:flex-row md:p-10">
            <div className="flex flex-col gap-[8rem]">
              {countUser("ฝ่ายบริหาร") > 0 && (
                <div className="flex flex-col items-center gap-3">
                  <Text weight={"bold"} className="prompt" size={"$4xl"}>
                    ประธานองค์กร
                  </Text>
                  <div className="flex w-full flex-wrap text-center items-center justify-center gap-5">
                    {findName("ประธาน")?.map((tag, index) => (
                      <AvatarComponent {...tag} key={index} position={"ประธาน"} />
                    ))}
                  </div>
                  <div className="flex w-full flex-wrap text-center items-center justify-center gap-5">
                    {findName("รองประธาน (สารสนเทศ)")?.map((tag, index) => (
                      <AvatarComponent {...tag} key={index} position={"รองประธาน (สารสนเทศ)"} />
                    ))}
                    {findName("รองประธาน (กิจกรรม)")?.map((tag, index) => (
                      <AvatarComponent {...tag} key={index} position={"รองประธาน (กิจกรรม)"} />
                    ))}
                  </div>
                </div>
              )}
              {countUser("ฝ่ายบริหาร") > 0 && (
                <div className="flex flex-col items-center gap-3">
                  <Text weight={"bold"} className="prompt" size={"$4xl"}>
                    ฝ่ายบริหาร
                  </Text>
                  <div className="flex w-full flex-wrap-reverse text-center items-center justify-center gap-5">
                    {findName("หัวหน้าฝ่ายบริหาร")?.map((tag, index) => (
                      <AvatarComponent {...tag} key={index} position={"หัวหน้าฝ่ายบริหาร"} />
                    ))}
                  </div>
                  <div className="flex w-full flex-wrap-reverse text-center items-center justify-center gap-5">
                    {findName("ฝ่ายบริหาร")?.map((tag, index) => (
                      <AvatarComponent {...tag} key={index} position={"ฝ่ายบริหาร"} />
                    ))}
                  </div>
                </div>
              )}
              {countUser("ฝ่ายสารสนเทศ") > 0 && (
                <div className="flex flex-col items-center gap-3">
                  <Text weight={"bold"} className="prompt" size={"$4xl"}>
                    ฝ่ายสารสนเทศ
                  </Text>
                  <div className="flex w-full flex-wrap-reverse text-center items-center justify-center gap-5">
                    {findName("หัวหน้าฝ่ายสารสนเทศ")?.map((tag, index) => (
                      <AvatarComponent {...tag} key={index} position={"หัวหน้าฝ่ายสารสนเทศ"} />
                    ))}
                  </div>
                  <div className="flex w-full flex-wrap-reverse text-center items-center justify-center gap-5">
                    {findName("ฝ่ายสารสนเทศ")?.map((tag, index) => (
                      <AvatarComponent {...tag} key={index} position={"ฝ่ายสารสนเทศ"} />
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
                    <div className="flex w-full flex-wrap-reverse text-center items-center justify-center gap-5">
                      {findName("หัวหน้าฝ่ายกิจกรรม")?.map((tag, index) => (
                        <AvatarComponent {...tag} key={index} position={"หัวหน้าฝ่ายกิจกรรม"} />
                      ))}
                    </div>
                    <div className="flex w-full flex-wrap-reverse text-center items-center justify-center gap-5">
                      {findName("ฝ่ายกิจกรรม")?.map((tag, index) => (
                        <AvatarComponent {...tag} key={index} position={"ฝ่ายกิจกรรม"} />
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
                  <div className="flex w-full flex-wrap-reverse text-center items-center justify-center gap-5">
                    {findName("หัวหน้าฝ่ายโสตฯ")?.map((tag, index) => (
                      <AvatarComponent {...tag} key={index} position={"หัวหน้าฝ่ายโสตฯ"} />
                    ))}
                  </div>
                  <div className="flex w-full flex-wrap-reverse text-center items-center justify-center gap-5">
                    {findName("ฝ่ายโสตฯ")?.map((tag, index) => (
                      <AvatarComponent {...tag} key={index} position={"ฝ่ายโสตฯ"} />
                    ))}
                  </div>
                </div>
              )}
              {countUser("ฝ่ายประชาสัมพันธ์") > 0 && (
                <div className="flex flex-col items-center gap-3">
                  <Text weight={"bold"} className="prompt" size={"$4xl"}>
                    ฝ่ายประชาสัมพันธ์
                  </Text>
                  <div className="flex w-full flex-wrap-reverse items-center justify-center gap-5">
                    {findName("หัวหน้าฝ่ายประชาสัมพันธ์")?.map((tag, index) => (
                      <AvatarComponent {...tag} key={index} position={"หัวหน้าฝ่ายประชาสัมพันธ์"} />
                    ))}
                  </div>
                  <div className="flex w-full flex-wrap-reverse items-center justify-center gap-5">
                    {findName("ฝ่ายประชาสัมพันธ์")?.map((tag, index) => (
                      <AvatarComponent {...tag} key={index} position={"ฝ่ายประชาสัมพันธ์"} />
                    ))}
                  </div>
                </div>
              )}
            </div>
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
    </>
  );
};

export default Members;
