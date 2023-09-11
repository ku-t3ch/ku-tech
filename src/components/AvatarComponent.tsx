import { Avatar, Text } from "@nextui-org/react";
import clsx from "clsx";
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
  href?: string | null;
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
  showButton,
  href,
}) => {
  return (
    <>
      <div
        id={id ?? "default"}
        className={clsx(
          "relative z-0 flex min-w-[18rem] max-w-[21rem] flex-col items-center justify-center gap-1 pt-4 pb-6"
        )}
      >
        <Avatar
          css={{ size: "$20" }}
          src={core_team_profile_image_path ? core_team_profile_image_path : `/avatar.png`}
          color="primary"
          bordered
          onClick={() => {
            if (href) {
              window.open(href, "_blank");
            }
          }}
        />
        <div className="mt-2 flex flex-col items-center justify-center">
          <Text b size={"$2xl"}>
            {first_name_th} {last_name_th} {nick_name && `(${nick_name})`}
          </Text>
          <Text b size={"$md"} color="">
            {position}
          </Text>
          <Text className="flex flex-col items-center justify-center" size={"$md"} color="">
            {/* <div>{faculty}</div> */}
            <div>{major}</div>
          </Text>
        </div>
        {showButton && button}
      </div>
    </>
  );
};

export default AvatarComponent;
