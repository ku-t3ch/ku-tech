import { Button, Text } from "@nextui-org/react";
import { NextPage } from "next";
import { signIn } from "next-auth/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const WithNavbar = dynamic(() => import("@/layouts/WithNavbar"), {
  ssr: false,
});

interface Props {}

const SignIn: NextPage<Props> = () => {
  const { query } = useRouter();

  return (
    <div className="mx-auto h-screen w-full max-w-[73rem] flex-col gap-10 p-5 md:flex-row md:p-10">
      <div className="flex h-full w-full flex-col items-center justify-center gap-5">
        <Button
          onClick={() =>
            signIn("google", { callbackUrl: query.callbackUrl as string })
          }
          auto
          size={`xl`}
          color={"gradient"}
          bordered
        >
          Sign with Google (@ku.th)
        </Button>
      </div>
    </div>
  );
};

export default SignIn;
