import ShortLinkUser from "@/components/user/ShortLinkUser";
import { NextPage, NextPageContext } from "next";
import { getToken } from "next-auth/jwt";
import dynamic from "next/dynamic";

export async function getServerSideProps(ctx: NextPageContext) {
    const token = await getToken({
      req: ctx.req as any,
      secret: process.env.JWT_SECRET,
    });
    if (!token?.isMember) {
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

const ShortLink: NextPage<Props> = () => {
  return (
    <WithNavbar>
      <div className="mx-auto w-full max-w-[73rem] flex-col gap-10 p-5 md:flex-row md:p-10">
        <div className="flex w-full flex-col gap-5">
          <ShortLinkUser />
        </div>
      </div>
    </WithNavbar>
  );
};

export default ShortLink;
