import { Info, NewsInterface } from "@/interfaces/NewsInterface";
import { Text } from "@nextui-org/react";
import axios from "axios";
import { NextPage, NextPageContext } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";

const WithNavbar = dynamic(() => import("@/layouts/WithNavbar"), {
  ssr: false,
});

export async function getServerSideProps(context: NextPageContext) {
  const { id } = context.query;

  let data = JSON.stringify({
    operationName: "MyQuery",
    variables: {},
    query: `query MyQuery {\n  info(where: {id: \"${id}\"}) {\n    title\n    createdAt\n    cover {\n      url\n      __typename\n    }\n    content {\n      text\n    html\n     __typename\n    }\n    createdBy {\n      name\n      __typename\n    }\n    __typename\n  }\n}`,
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
      <WithNavbar>
        <div className="mx-auto w-full max-w-[73rem] flex-col gap-10 p-5 md:flex-row md:p-10">
          <div className="flex w-full flex-col gap-5">
            <Text className="prompt self-center" size={"$3xl"}>
              ไม่พบข้อมูล
            </Text>
          </div>
        </div>
      </WithNavbar>
    );
  }

  const shortDescription = (description: string) => {
    return description.length > 100
      ? description.substring(0, 100) + "..."
      : description;
  };

  return (
    <>
      <Head>
        <title>{data?.info?.title} - KU Tech</title>
        <meta name="title" content={data?.info?.title} />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content={shortDescription(data?.info?.content.text!)}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`http://kutech.club/news/${id}`} />
        <meta property="og:title" content={data?.info?.title} />
        <meta
          property="og:description"
          content={shortDescription(data?.info?.content.text!)}
        />
        <meta property="og:image" content={data?.info?.cover.url} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content={`http://kutech.club/news/${id}`}
        />
        <meta property="twitter:title" content="KU Tech" />
        <meta
          property="twitter:description"
          content={shortDescription(data?.info?.content.text!)}
        />
        <meta property="twitter:image" content={data?.info?.cover.url} />
      </Head>
      <WithNavbar>
        <div className="mx-auto w-full max-w-[73rem] flex-col gap-10 p-5 md:flex-row md:p-10">
          <div className="flex w-full flex-col gap-5 pb-20">
            <Text className="prompt self-center" size={"$3xl"}>
              {data?.info?.title}
            </Text>
            <Text className="prompt self-center" size={"$sm"}>
              <div className="flex flex-col items-center">
                <div>
                  {new Date(data?.info?.createdAt!).toLocaleString("th-TH", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </div>
                <div> by {data?.info?.createdBy?.name}</div>
              </div>
            </Text>
            <img
              className="w-full max-w-xl self-center"
              src={data?.info?.cover.url}
              alt=""
            />
            <div className="prose-dark">
              <div
                dangerouslySetInnerHTML={{ __html: data?.info?.content.html! }}
              ></div>
            </div>
          </div>
        </div>
      </WithNavbar>
    </>
  );
};

export default News;
