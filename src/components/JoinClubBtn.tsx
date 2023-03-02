import { Button } from "@nextui-org/react";
import { NextPage } from "next";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useRouter } from "next/router";

interface Props {}

const JoinClubBtn: NextPage<Props> = () => {
  const { push } = useRouter();
  return (
    <Button
      size={"lg"}
      bordered
      shadow
      color="gradient"
      auto
      className="z-0"
      href="/join"
      as="a"
      icon={<ArrowForwardIcon className="animate-pulse" />}
    >
      เข้าร่วมชมรม
    </Button>
  );
};

export default JoinClubBtn;
