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
        <div className="flex w-full flex-wrap items-center justify-center text-center gap-5">
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
              "https://s3.tech.nisit.ku.ac.th/assets/professor/thepparit.jpeg"
            }
            first_name_th="รศ.ดร.เทพฤทธิ์ บัณฑิตวัฒนาวงศ์"
            position={"อาจารย์ที่ปรึกษา ห้องวิจัยและปฏิบัติการ CiSo"}
            major="วิทยาการคอมพิวเตอร์"
          />
        </div>
        <div className="flex w-full flex-wrap-reverse items-center justify-center text-center gap-5">
            <AvatarComponent
            core_team_profile_image_path={
              "https://s3.tech.nisit.ku.ac.th/assets/professor/chaiporn.jpg"
            }
            first_name_th="ผศ.ดร.ชัยพร ใจแก้ว"
            position={"อาจารย์ที่ปรึกษาพิเศษ ด้านฮาร์ดแวร์ฯ"}
            major="วิศวกรรมคอมพิวเตอร์"
          />
          <AvatarComponent
            core_team_profile_image_path={
              "https://s3.tech.nisit.ku.ac.th/assets/professor/thammakorn.jpeg"
            }
            first_name_th="ผศ.ดร.ธรรมกร แซ่ตั้ง"
            position={"อาจารย์ที่ปรึกษาพิเศษ ด้านวิทยาการข้อมูล"}
            major="วิทยาการคอมพิวเตอร์"
          />
          <AvatarComponent
            core_team_profile_image_path={
              "https://s3.tech.nisit.ku.ac.th/assets/professor/sethavidh.jpeg"
            }
            first_name_th="ผศ.ดร.เสฎฐวิทย์ เกิดผล"
            position={"อาจารย์ที่ปรึกษาพิเศษ ด้านปัญญาประดิษฐ์"}
            major="วิทยาการคอมพิวเตอร์"
          />
          <AvatarComponent
            core_team_profile_image_path={
              "https://s3.tech.nisit.ku.ac.th/assets/professor/pannapat.jpeg"
            }
            first_name_th="อ.พรรณภัทร์ จันทร์ไพแสง"
            position={"อาจารย์ที่ปรึกษาพิเศษ ด้านการออกแบบประสบการณ์ผู้ใช้งาน"}
            major="วิทยาการคอมพิวเตอร์"
          />
        </div>
      </div>
      {!coreTeamApi.isLoading ? (
        <>
          <div className="mx-auto w-full max-w-[80rem] flex-col gap-3 p-5 md:flex-row md:p-10">
            <div className="flex flex-col gap-[8rem]">
              {countUser("กลุ่มงานบริหาร") > 0 && (
                <div className="flex flex-col items-center gap-3">
                  <Text weight={"bold"} className="prompt" size={"$4xl"}>
                    ประธานองค์กร
                  </Text>
                  <div className="flex w-full flex-wrap text-center items-center justify-center gap-5">
                    {findName("ประธาน")?.map((tag, index) => (
                      <AvatarComponent {...tag} key={index} head={true} position={"ประธาน"} />
                    ))}
                  </div>
                  <div className="flex w-full flex-wrap text-center items-center justify-center gap-5">
                    {findName("รองประธาน (เทคโนโลยีฯ)")?.map((tag, index) => (
                      <AvatarComponent {...tag} key={index} head={true} position={"รองประธาน (เทคโนโลยีฯ)"} />
                    ))}
                    {findName("รองประธาน (กิจกรรม)")?.map((tag, index) => (
                      <AvatarComponent {...tag} key={index} head={true} position={"รองประธาน (กิจกรรม)"} />
                    ))}
                  </div>
                </div>
              )}
              {countUser("กลุ่มงานบริหาร") > 0 && (
                <div className="flex flex-col items-center gap-3">
                  <Text weight={"bold"} className="prompt" size={"$4xl"}>
                    กลุ่มงานบริหาร
                  </Text>
                  <div className="flex w-full flex-wrap-reverse text-center items-center justify-center gap-5">
                    {findName("หัวหน้ากลุ่มงานบริหาร")?.map((tag, index) => (
                      <AvatarComponent {...tag} key={index} head={true} position={"หัวหน้ากลุ่มงานบริหาร"} />
                    ))}
                  </div>
                  <div className="flex w-full flex-wrap-reverse text-center items-center justify-center gap-5">
                    {findName("กลุ่มงานบริหาร")?.map((tag, index) => (
                      <AvatarComponent {...tag} key={index} position={"กลุ่มงานบริหาร"} />
                    ))}
                  </div>
                </div>
              )}
              {countUser("กลุ่มงานเทคโนโลยีฯ") > 0 && (
                <div className="flex flex-col items-center gap-3">
                  <Text weight={"bold"} className="prompt" size={"$4xl"}>
                    กลุ่มงานเทคโนโลยีฯ
                  </Text>
                  <div className="flex w-full flex-wrap-reverse text-center items-center justify-center gap-5">
                    {findName("หัวหน้ากลุ่มงานเทคโนโลยีฯ")?.map((tag, index) => (
                      <AvatarComponent {...tag} key={index} head={true} position={"หัวหน้ากลุ่มงานเทคโนโลยีฯ"} />
                    ))}
                  </div>
                  <div className="flex w-full flex-wrap-reverse text-center items-center justify-center gap-5">
                    {findName("กลุ่มงานเทคโนโลยีฯ")?.map((tag, index) => (
                      <AvatarComponent {...tag} key={index} position={"กลุ่มงานเทคโนโลยีฯ"} />
                    ))}
                  </div>
                </div>
              )}
              {countUser("กลุ่มงานกิจกรรม") > 0 && (
                <div className="flex flex-col items-center gap-3">
                  <div className="flex flex-col items-center gap-3">
                    <Text weight={"bold"} className="prompt" size={"$4xl"}>
                      กลุ่มงานกิจกรรม
                    </Text>
                    <div className="flex w-full flex-wrap-reverse text-center items-center justify-center gap-5">
                      {findName("หัวหน้ากลุ่มงานกิจกรรม")?.map((tag, index) => (
                        <AvatarComponent {...tag} key={index} head={true} position={"หัวหน้ากลุ่มงานกิจกรรม"} />
                      ))}
                    </div>
                    <div className="flex w-full flex-wrap-reverse text-center items-center justify-center gap-5">
                      {findName("กลุ่มงานกิจกรรม")?.map((tag, index) => (
                        <AvatarComponent {...tag} key={index} position={"กลุ่มงานกิจกรรม"} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {countUser("กลุ่มงานประชาสัมพันธ์") > 0 && (
                <div className="flex flex-col items-center gap-3">
                  <Text weight={"bold"} className="prompt" size={"$4xl"}>
                    กลุ่มงานประชาสัมพันธ์
                  </Text>
                  <div className="flex w-full flex-wrap-reverse items-center justify-center gap-5">
                    {findName("หัวหน้ากลุ่มงานประชาสัมพันธ์")?.map((tag, index) => (
                      <AvatarComponent {...tag} key={index} position={"หัวหน้ากลุ่มงานประชาสัมพันธ์"} />
                    ))}
                  </div>
                  <div className="flex w-full flex-wrap-reverse items-center justify-center gap-5">
                    {findName("กลุ่มงานประชาสัมพันธ์")?.map((tag, index) => (
                      <AvatarComponent {...tag} key={index} position={"กลุ่มงานประชาสัมพันธ์"} />
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
