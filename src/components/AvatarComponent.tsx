import { Avatar, Text } from "@nextui-org/react";
import { NextPage } from "next";

interface Props {
  first_name_th?: string | null;
  last_name_th?: string | null;
  nick_name?: string | null;
  position?: string | null;
  google_id?: string | null;
  faculty?: string | null;
  major?: string | null;
  year?: number | null;
  core_team_profile_image_path?: string | null;
}

const AvatarComponent: NextPage<Props> = ({ 
  faculty,
  first_name_th,
  google_id,
  last_name_th,
  major,
  year,
  nick_name,
  position,
  core_team_profile_image_path,
}) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-3 z-0 w-[21rem]">
        <Avatar
          css={{ size: "$20" }}
          src={core_team_profile_image_path ? `https://s3.kutech.club/production-core-team/${core_team_profile_image_path}` : `/avatar.png`}
          color="primary"
          bordered
        />
        <div className="flex flex-col items-center justify-center">
          <Text b size={"$2xl"}>
            {first_name_th} {last_name_th} ({nick_name})
          </Text>
          <Text b size={"$md"} color="">
            {position}
          </Text>
          <Text
            className="flex flex-col items-center justify-center"
            size={"$md"}
            color=""
          >
            {/* <div>{faculty}</div> */}
            <div>
              {major}
            </div>
          </Text>
        </div>
      </div>
    </>
  );
};

export default AvatarComponent;
