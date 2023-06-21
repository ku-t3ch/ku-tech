import { NextPage, NextPageContext } from "next";

import _ from "lodash";
import { getToken } from "next-auth/jwt";
import ChangeProfileCore from "@/components/core-page/ChangeProfileCore";

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

interface Props {}

const Core: NextPage<Props> = () => {
  return (
    <div className="mx-auto w-full max-w-[73rem] flex-col gap-10 p-5 md:flex-row md:p-10">
      <div className="flex w-full flex-col gap-5">
        <ChangeProfileCore />
      </div>
    </div>
  );
};

export default Core;
