import { NextPage, NextPageContext } from "next";
import dynamic from "next/dynamic";

const WithNavbar = dynamic(() => import("@/layouts/WithNavbar"), {
  ssr: false,
});

export async function getServerSideProps(ctx: NextPageContext) {
  return {
    redirect: {
      destination: "/core",
      permanent: false,
    },
  };
}

interface Props {
  isCoreTeam: boolean;
}

const Cms: NextPage<Props> = () => {
  return <></>;
};

export default Cms;
