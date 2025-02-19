import { NextPage } from "next";
import { Loading, Text } from "@nextui-org/react";
import AvatarComponent from "@/components/AvatarComponent";
import { api } from "@/utils/api";

interface Props {}

const Alumni: NextPage<Props> = () => {
  const coreTeamApi = api.coreTeam.get.useQuery();

  const findName = (name: string) => {
    if (coreTeamApi.data === undefined) {
      return [];
    }
    return coreTeamApi.data![1]?.tags.filter((tag) => tag.name === name)![0]?.request_user || [];
  };

  const countUser = (name: string) => {
    return (
      coreTeamApi.data![1]?.tags.filter((tag) => tag.name === name)![0]?.request_user.length || 0
    );
  };

  console.log(coreTeamApi.data);

  return (
    <>
      {!coreTeamApi.isLoading ? (
        <>
          <div className="mx-auto w-full max-w-[80rem] flex-col gap-3 p-5 md:flex-row md:p-10">
            <div className="flex flex-col gap-[8rem]">
              {countUser("สมาคมศิษย์เก่า") > 0 && (
                <div className="flex flex-col items-center gap-3">
                  <Text weight={"bold"} className="prompt" size={"$4xl"}>
                    สมาคมศิษย์เก่า
                  </Text>
                  <div className="flex w-full flex-wrap-reverse items-center justify-center gap-5">
                    {findName("ประธานสมาคม")?.map((tag, index) => (
                      <AvatarComponent {...tag} key={index} position={"ประธานสมาคม"} />
                    ))}
                  </div>
                  <div className="flex w-full flex-wrap-reverse items-center justify-center gap-5">
                    {findName("สมาคมศิษย์เก่า")?.map((tag, index) => (
                      <AvatarComponent {...tag} key={index} position={"สมาคมศิษย์เก่า"} />
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

export default Alumni;
