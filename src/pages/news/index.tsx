import { Text } from "@nextui-org/react";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { gql, useQuery } from "@apollo/client";
import { Info, NewsInterface } from "@/interfaces/NewsInterface";
import { Spin } from "antd";

const CardNews = dynamic(() => import("@/components/news/CardNews"), {
  ssr: false,
});

const WithNavbar = dynamic(() => import("@/layouts/WithNavbar"), {
  ssr: false,
});

interface Props {}

const News: NextPage<Props> = () => {
  const { loading, error, data } = useQuery<NewsInterface<Info[]>>(gql`
    query Infos {
      infos {
        createdAt
        id
        publishedAt
        title
        cover {
          url
        }
      }
    }
  `);

  if (data?.infos?.length === 0) {
    return (
      <WithNavbar>
        <div className="mx-auto h-full w-full max-w-[73rem] flex-col gap-10 p-5 md:flex-row md:p-10">
          <div className="flex h-full w-full flex-col gap-5">
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
      <div className="mx-auto h-full w-full max-w-[73rem] flex-col gap-10 p-5 md:flex-row md:p-10">
        <div className="flex h-full w-full flex-col gap-5">
          <Text className="prompt" size={"$3xl"}>
            ข่าวสาร
          </Text>
          <div className="flex h-full flex-col gap-5">
            {!loading ? (
              data?.infos?.map((info) => <CardNews info={info} />)
            ) : (
              <div className="flex h-[90%] flex-col items-center justify-center">
                <Spin tip="Loading" size="large"></Spin>
              </div>
            )}
          </div>
        </div>
      </div>
    </WithNavbar>
  );
};

export default News;
