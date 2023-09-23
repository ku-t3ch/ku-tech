import { FC } from "react";
import { Loading } from "@nextui-org/react";

interface Props {}

export const LoadingScreen: FC<Props> = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <Loading size="lg" />
      </div>
    </div>
  );
};
