import { prisma } from "@/server/db";
import { NextPage, NextPageContext } from "next";

interface Props {}

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;
  const data = await prisma.shortLink.findUnique({
    where: {
      short_link: String(id),
    },
  });

  if (!data) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  await prisma.shortLink.update({
    where: {
      short_link: String(id),
    },
    data: {
      count: {
        increment: 1,
      },
    },
  });
  if (!data) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    redirect: {
      destination: data.original_link,
      permanent: false,
    },
  };
}

const LinkShort: NextPage<Props> = () => {
  return <></>;
};

export default LinkShort;
