import { Button } from "@nextui-org/react";
import { NextPage } from "next";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

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
        <Link href={"/"} className="text-red-400 text-lg"><ChevronLeftIcon />กลับหน้าหลัก</Link>
      </div>
    </div>
  );
};

export default SignIn;
