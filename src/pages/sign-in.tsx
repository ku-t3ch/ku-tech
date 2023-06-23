import Link from "next/link";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import { NextPage } from "next";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

import { Button } from "@nextui-org/react";

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
        <Link href={"/"} className="text-lg text-red-400">
          <ChevronLeftIcon />
          กลับหน้าหลัก
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
