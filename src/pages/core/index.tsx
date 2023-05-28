import { NextPage, NextPageContext } from "next";
import dynamic from "next/dynamic";

import _ from "lodash";
import { getToken } from "next-auth/jwt";
import ChangeProfileCore from "@/components/core-page/ChangeProfileCore";
import ShortLinkCore from "@/components/core-page/ShortLinkCore";

export async function getServerSideProps(ctx: NextPageContext) {
  const token = await getToken({
    req: ctx.req as any,
    secret: process.env.JWT_SECRET,
  });
  if (!token?.isCoreTeam) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

const WithNavbar = dynamic(() => import("@/layouts/WithNavbar"), {
  ssr: false,
});

interface Props {}

const Core: NextPage<Props> = () => {
  return (
    <WithNavbar>
      <div className="mx-auto w-full max-w-[73rem] flex-col gap-10 p-5 md:flex-row md:p-10">
        <div className="flex w-full flex-col gap-5">
          <ChangeProfileCore />
          <ShortLinkCore />
        </div>
      </div>
    </WithNavbar>
  );
};

export default Core;
