import { Info, NewsInterface } from "@/interfaces/NewsInterface";
import { prisma } from "@/server/db";
import axios from "axios";
import { NextPage, NextPageContext } from "next";

const URL = "https://kutech.club";

export async function getServerSideProps(ctx: NextPageContext) {
  const { res } = ctx;

  let data = JSON.stringify({
    operationName: "Infos",
    variables: {
      search: "",
    },
    query:
      "query Infos($search: String!) {\n  infos(where: {_search: $search}) {\n    createdAt\n    id\n    publishedAt\n    title\n    cover {\n      url\n      __typename\n    }\n    createdBy {\n      name\n      __typename\n    }\n    __typename\n  }\n}",
  });

  const resData = await axios({
    method: "post",
    url: process.env.NEXT_PUBLIC_GRAPHQL_URL,
    data: data,
  });

  const posts = resData.data.data as NewsInterface<Info[]>;

  res?.setHeader("Content-Type", "text/xml");

  res?.write(`<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${posts.infos?.length!! > 0 && posts.infos!!
    .map(({ id,createdAt }) => {
      return `
    <url>
        <loc>${URL}/news/${id}</loc>
        <lastmod>${new Date(createdAt).toISOString()}</lastmod>
    </url>
  `;
    })
    .join("")}
    </urlset>
  `);
  res?.end();

  return {
    props: {},
  };
}

interface Props {}

const PageSitemap: NextPage<Props> = () => {
  return <></>;
};

export default PageSitemap;
