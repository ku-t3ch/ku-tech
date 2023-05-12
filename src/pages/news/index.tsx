import { Input, Text } from "@nextui-org/react";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { gql, useQuery } from "@apollo/client";
import { Info, NewsInterface } from "@/interfaces/NewsInterface";
import { Spin } from "antd";
import _ from "lodash";
import CardNews from "@/components/news/CardNews";

const WithNavbar = dynamic(() => import("@/layouts/WithNavbar"), {
  ssr: false,
});

interface Props {}

const News: NextPage<Props> = () => {
  const { loading, data, refetch } = useQuery<NewsInterface<Info[]>>(
    gql`
      query Infos($search: String!) {
        infos(where: { _search: $search }) {
          createdAt
          id
          publishedAt
          title
          cover {
            url
          }
          createdBy {
            name
          }
        }
      }
    `,
    {
      variables: {
        search: "",
      },
    }
  );

  const handleSearch = (value: string) => {
    refetch({
      search: value,
    });
  };

  return (
    <WithNavbar>
      <div className="mx-auto w-full max-w-[73rem] flex-col gap-10 p-5 md:flex-row md:p-10">
        <div className="flex w-full flex-col gap-5">
          <Text className="prompt" size={"$3xl"}>
            ข่าวสาร
          </Text>
          <Input
            clearable
            placeholder="ค้นหา"
            onChange={(e) => handleSearch(e.target.value)}
          />
          {data?.infos?.length === 0 ? (
            <div>ไม่พบข้อมูล</div>
          ) : (
            <div className="flex flex-col gap-5 pb-20">
              {!loading ? (
                _.orderBy(data?.infos, "createdAt", "desc").map((info) => (
                  <CardNews info={info} />
                ))
              ) : (
                <div className="flex h-[90%] flex-col items-center justify-center">
                  <Spin tip="Loading" size="large"></Spin>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </WithNavbar>
  );
};

export default News;
