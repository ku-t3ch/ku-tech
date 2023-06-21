import dynamic from "next/dynamic";

import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Wrapper: FC<Props> = ({ children }) => {
  return <>{children}</>;
};

export default dynamic(() => Promise.resolve(Wrapper), {
  ssr: false,
});
