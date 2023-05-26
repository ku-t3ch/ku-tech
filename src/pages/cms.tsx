import UploadComponent from "@/components/UploadComponent";
import { prisma } from "@/server/db";
import { Text } from "@nextui-org/react";
import { NextPage, NextPageContext } from "next";
import { getToken } from "next-auth/jwt";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { toast } from "react-hot-toast";

const WithNavbar = dynamic(() => import("@/layouts/WithNavbar"), {
  ssr: false,
});

export async function getServerSideProps(ctx: NextPageContext) {
  let token = await getToken({
    req: ctx.req as any,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  console.log(token);
  

  if (!token) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  const user = await prisma.request.findUnique({
    where: {
      email: token.email,
    },
    include: {
      tags: {
        select: {
          tag_type: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  const isCoreTeam = user?.tags[0]?.tag_type?.name === "core-team-cms" || false;

  if (!isCoreTeam) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  return {
    props: {
      isCoreTeam: user?.tags[0]?.tag_type?.name === "core-team-cms" || false,
    },
  };
}

interface Props {
  isCoreTeam: boolean;
}

const Cms: NextPage<Props> = () => {
  return (
    <WithNavbar>
      <div className="mx-auto w-full max-w-[73rem] flex-col gap-10 p-5 md:flex-row md:p-10">
        <div className="flex w-full flex-col gap-5">
          <Text>อัพเดทโปรไฟล์ในหน้า CoreTeam</Text>
          <UploadComponent
            onReady={(v) => toast.success("อัพโหลดรูปภาพสำเร็จ")}
            action="/api/image_upload_core_team_cms"
          />
        </div>
      </div>
    </WithNavbar>
  );
};

export default Cms;
