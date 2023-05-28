import { Input, Text } from "@nextui-org/react";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { gql, useQuery } from "@apollo/client";
import { Info, NewsInterface } from "@/interfaces/NewsInterface";
import { Spin } from "antd";
import _ from "lodash";
import CardNews from "@/components/news/CardNews";
import { useEffect, useState } from "react";

const WithNavbar = dynamic(() => import("@/layouts/WithNavbar"), {
  ssr: false,
});

interface Props { }

const News: NextPage<Props> = () => {
  const [searchTerm, setSearchTerm] = useState("");
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

  useEffect(() => {
    if (searchTerm === "") {
      refetch({
        search: searchTerm,
      });
    }
    const delayDebounceFn = setTimeout(() => {
      refetch({
        search: searchTerm,
      });
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <WithNavbar>
      <div className="mx-auto max-w-[73rem] flex-col gap-10 p-5 md:flex-row md:p-10">
        <div className="flex w-full flex-col gap-5 pb-6">
          <Text className="prompt" size={"$3xl"}>
            ข่าวสาร
          </Text>
          <Input
            clearable
            placeholder="ค้นหา"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {/* <div className="flex w-full flex-col gap-5"> */}
        <div className="flex w-full flex-col gap-5">
          {data?.infos?.length === 0 ? (
            <div>ไม่พบข้อมูล</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 pb-20">
              {!loading ? (
                _.orderBy(data?.infos, "createdAt", "desc").map((info,index) => (
                  <CardNews info={info} key={index} />
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
