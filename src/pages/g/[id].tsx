import { api } from "@/utils/api";
import { Loading } from "@nextui-org/react";
import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface Props {
  id: string;
}

export async function getServerSideProps(ctx: NextPageContext) {
  return {
    props: {
      id: ctx.query.id,
    },
  };
}

const G: NextPage<Props> = ({ id }) => {
  const getShortLink = api.shortlink.getShortLink.useQuery({ short_link: id });
  const router = useRouter();

    useEffect(() => {
      if (getShortLink.isSuccess) {
        if (getShortLink.data === null) {
          router.push("/");
          return;
        }
        router.push(getShortLink.data!);
      }
    }, [getShortLink]);

  return (
    <div className="absolute top-0 bottom-0 right-0 left-0 flex h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-3">
        <Loading size="lg" type="points-opacity" />
        <div>redirecting</div>
      </div>
    </div>
  );
};

export default G;
