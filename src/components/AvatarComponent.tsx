import { Avatar, Text } from "@nextui-org/react";
import { NextPage } from "next";

interface AvatarComponentProps {
  id?: string | null;
  first_name_th?: string | null;
  last_name_th?: string | null;
  nick_name?: string | null;
  position?: string | null;
  google_id?: string | null;
  faculty?: string | null;
  major?: string | null;
  year?: number | null;
  core_team_profile_image_path?: string | null;
  button?: JSX.Element | null;
  showButton?: boolean;
}

const AvatarComponent: NextPage<AvatarComponentProps> = ({
  id, 
  faculty,
  first_name_th,
  google_id,
  last_name_th,
  major,
  year,
  nick_name,
  position,
  core_team_profile_image_path,
  button,
  showButton
}) => {
  return (
    <>
      <div id={id ?? "default"} className="flex flex-col items-center justify-center gap-1 z-0 max-w-[21rem] min-w-[18rem] pt-4 pb-6 relative">
        <Avatar
          css={{ size: "$20" }}
          src={core_team_profile_image_path ? `https://s3.tech.nisit.ku.ac.th/core-team/${core_team_profile_image_path}` : `/avatar.png`}
          color="primary"
          bordered
        />
        <div className="flex flex-col items-center justify-center mt-2">
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
          {showButton && button}
      </div>
    </>
  );
};

export default AvatarComponent;
