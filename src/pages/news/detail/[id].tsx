import { Info, NewsInterface } from "@/interfaces/NewsInterface";
import { gql, useQuery } from "@apollo/client";
import { Badge, Text } from "@nextui-org/react";
import { NextPage, NextPageContext } from "next";
import dynamic from "next/dynamic";

const WithNavbar = dynamic(() => import("@/layouts/WithNavbar"), {
  ssr: false,
});

export async function getServerSideProps(context: NextPageContext) {
  return {
    props: {
      id: context.query.id,
    },
  };
}

interface Props {
  id: string;
}

const News: NextPage<Props> = ({ id }) => {
  const { data } = useQuery<NewsInterface<Info>>(gql`
    query MyQuery {
      info(where: { id: "${id}" }) {
        title
        createdAt
        cover {
            url
        }
        content {
          html
        }
        createdBy {
            name
        }
      }
    }
  `);

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

  return (
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
  );
};

export default News;
