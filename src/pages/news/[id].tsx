import { Info, NewsInterface } from "@/interfaces/NewsInterface";
import { Text } from "@nextui-org/react";
import axios from "axios";
import { NextPage, NextPageContext } from "next";
import { NextSeo } from "next-seo";
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
      <NextSeo
        title={data?.info?.title}
        description={shortDescription(data?.info?.content.text!)}
        openGraph={{
          title: data?.info?.title,
          url: "http://kutech.club/news/" + id,
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
      <WithNavbar>
        <div className="mx-auto w-full max-w-[73rem] flex-col gap-10 p-5 md:flex-row md:p-10">
          <div className="flex w-full flex-col gap-5 pb-20">
            <Text className="prompt self-start" size={"$3xl"}>
              {data?.info?.title}
            </Text>
            <div className="flex items-center gap-3">
              <div>
                <img src="/avatar.png" className="w-[3rem]" alt="" />
              </div>
              <div className="flex flex-col">
                <div>{data?.info?.createdBy?.name}</div>
                <div>
                  {new Date(data?.info?.createdAt!).toLocaleString("th-TH", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </div>
              </div>
            </div>
            <img
              className="h-full w-full md:max-w-md object-contain "
              src={data?.info?.cover.url}
              alt=""
            />
             <div className="prose-dark">
              <div
                dangerouslySetInnerHTML={{ __html: data?.info?.content.html! }}
              ></div>
            </div>

            {/* <Text className="prompt self-center" size={"$3xl"}>
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
            </div> */}
          </div>
        </div>
      </WithNavbar>
    </>
  );
};

export default News;
