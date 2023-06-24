import axios from "axios";
import Head from "next/head";

import NoSSR from "@/components/NoSSR";
import NewsTag from "@/components/news/NewsTag";

import { NextSeo } from "next-seo";
import { NextPage, NextPageContext } from "next";
import { Info, NewsInterface } from "@/interfaces/NewsInterface";

import { Text } from "@nextui-org/react";
import Image from "next/image";

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  let data = JSON.stringify({
    operationName: "MyQuery",
    variables: {},
    query: `query MyQuery {\n  info(where: {id: \"${id}\"}) {\n    title\n    createdAt\n    cover {\n      url\n      __typename\n    }\n    content {\n      text\n    html\n     __typename\n    }\n    createdBy {\n      name\n      __typename\n    }\n    __typename\n    tag {\n      ... on Tag {\n      name\n    }\n    }  }\n}`,
  });

  const res = await axios({
    method: "post",
    url: process.env.NEXT_PUBLIC_GRAPHQL_URL,
    data: data,
  });

  return {
    props: {
      id: context.query.id,
      data: res.data.data || null,
    },
  };
}

interface Props {
  id: string;
  data: NewsInterface<Info>;
}

const News: NextPage<Props> = ({ id, data }) => {
  if (data?.info === null) {
    return (
      <div className="mx-auto w-full max-w-[73rem] flex-col gap-10 p-5 md:flex-row md:p-10">
        <div className="flex w-full flex-col gap-5">
          <Text className="prompt self-center" size={"$3xl"}>
            ไม่พบข้อมูล
          </Text>
        </div>
      </div>
    );
  }

  const shortDescription = (description: string) => {
    return description.length > 100
      ? description.substring(0, 100) + "..."
      : description;
  };

  return (
    <>
      <NextSeo
        title={data?.info?.title}
        description={shortDescription(data?.info?.content.text!)}
        openGraph={{
          title: data?.info?.title,
          url: "http://tech.nisit.ku.ac.th/news/" + id,
          type: "website",
          description: shortDescription(data?.info?.content.text!),
          images: [
            {
              url: data?.info?.cover.url!,
              alt: data?.info?.title,
            },
          ],

          siteName: data?.info?.title,
        }}
        twitter={{
          handle: "@handle",
          site: "@site",
          cardType: "summary_large_image",
        }}
      />
      <Head>
        <style>
          {`
            .dark-theme {
              background: #1d1b20 !important;
            }
            body {
              background: #1d1b20 !important;
            }
          `}
        </style>
      </Head>
      <div className="mx-auto w-full max-w-[73rem] flex-col gap-10 p-5 md:flex-row md:p-10">
        <div className="flex w-full flex-col gap-5 pb-20">
          <Text className="prompt self-start" size={"$3xl"} weight="bold">
            {data?.info?.title}
          </Text>
          <div className="flex items-center gap-5">
            <div>
              <img src="/avatar.png" className="w-[3rem]" alt="" />
            </div>
            <div className="flex flex-col">
              <div className="text-sm">{data?.info?.createdBy?.name}</div>
              <div className="text-sm">
                <NoSSR>
                  {new Date(data?.info?.createdAt!).toLocaleString("th-TH", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </NoSSR>
              </div>
            </div>
          </div>
          <div className="mb-[1.5rem] flex flex-col">
            <div className="flex gap-3">
              {data?.info?.tag?.map((tag, index) => {
                return <NewsTag key={index} tag={tag} />;
              })}
            </div>
          </div>
          <Image
            className="h-full w-full object-contain md:max-w-md"
            width={0}
            height={0}
            loading="lazy"
            sizes="100vw"
            src={data?.info?.cover.url!}
            alt={data?.info?.title!}
          />
          <div className="prose-dark">
            <div
              dangerouslySetInnerHTML={{ __html: data?.info?.content.html! }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default News;
