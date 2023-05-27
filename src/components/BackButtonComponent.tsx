import { Button } from "@nextui-org/react";
import { NextPage } from "next";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useRouter } from "next/router";

interface Props {
}

const BackButtonComponent: NextPage<Props> = () => {
  const { back } = useRouter();
  return (
    <div onClick={() => back()} className="flex cursor-pointer">
      <ChevronLeftIcon /> กลับ
    </div>
  );
};

export default BackButtonComponent;
