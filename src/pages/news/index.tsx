import clsx from "clsx";
import Head from "next/head";
import dynamic from "next/dynamic";

import SearchBox from "@/components/news/SearchBox";
import CardTag, { CardTagSkeleton } from "@/components/news/CardTag";
import CardNews, { CardNewsSkeleton } from "@/components/news/CardNews";
import TagsFilterComponent, {
  TagsFilterSkeleton,
} from "@/components/news/TagsFilterComponent";

import { NextPage } from "next";
import { useEffect, useState } from "react";

import { gql, useQuery } from "@apollo/client";

import { Tag } from "@/interfaces/TagsInterface";
import { Info } from "@/interfaces/NewsInterface";

import { Icon } from "@iconify/react";
import { Grid, Text } from "@nextui-org/react";

const WithNavbar = dynamic(() => import("@/layouts/WithNavbar"), {
  ssr: false,
});

const News: NextPage<{}> = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [tagsId, setTagsId] = useState<Array<string>>([]);
  const [autoFetch, setAutoFetch] = useState<number>(0);
  const [isRequest, setIsRequest] = useState<boolean>(false);

  const { loading, data, refetch } = useQuery<{
    tags: Tag[];
    infos: Info[];
  }>(
    gql`
      query ($search: String!, $whereTags: InfoTagWhereInput) {
        infos(
          orderBy: createdAt_DESC
          where: { _search: $search, tag_some: $whereTags }
        ) {
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
        tags(orderBy: createdAt_DESC) {
          id
          name
          createdAt
        }
      }
    `,
    {
      variables: {
        search: "",
        whereTags: {},
      },
    }
  );

  // search fetch data
  useEffect(() => {
    if (searchTerm === "") {
      refetch({
        search: searchTerm,
        whereTags: {},
      });
    } else {
      setIsRequest(true);
    }

    const timeout = setTimeout(() => {
      refetch({
        search: searchTerm,
        whereTags: {},
      });
      setIsRequest(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  // click select multiple tags
  const handleClickSelectTag = (tagId: string) => {
    !tagsId.includes(tagId)
      ? setTagsId((p) => [...p, tagId])
      : setTagsId((p) => p.filter((v) => v != tagId));
  };

  // click fetch
  const handleFetchWithTags = () => {
    setIsRequest(true);
    setTimeout(() => {
      refetch({
        search: "",
        whereTags:
          tagsId.length == 0
            ? {}
            : {
                Tag: {
                  id_in: tagsId,
                },
              },
      });
      setIsRequest(false);
    }, 1000);
  };

  // auto fetch data when click tag
  useEffect(() => {
    if (autoFetch == 0) return;

    setIsRequest(true);

    const timeout = setTimeout(() => {
      handleFetchWithTags();
      setIsRequest(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [autoFetch]);

  return (
    <>
      <Head>
        <style>
          {`
            .dark-theme {
              background: #141218 !important;
            }
            body {
              background: #141218 !important;
            }
          `}
        </style>
      </Head>
      <WithNavbar>
        <div className="p-[2rem]">
          <Grid css={{ marginBottom: "$xl" }}>
            <Text
              size="$3xl"
              weight="bold"
              className="mt-[5rem] mb-[2rem] text-center"
            >
              ข่าวสารสำคัญ
            </Text>
            <div className="flex justify-center">
              <SearchBox onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
          </Grid>
          <div className="mx-auto max-w-[70rem]">
            {data?.infos?.length == 0 ? (
              <div className="flex flex-col gap-3 p-[5rem]">
                <Icon
                  icon="icon-park-solid:data"
                  className="mx-auto text-[1.5rem]"
                />
                <span className="text-center">ไม่พบข้อมูลข่าวสาร</span>
              </div>
            ) : (
              <Grid.Container gap={2}>
                <Grid xs={12} sm={0}>
                  <div className="tags mb-[1rem] flex w-full flex-nowrap gap-3 overflow-x-auto  rounded-[.5rem]">
                    {!loading
                      ? data?.tags?.map((tag, index) => {
                          return (
                            <CardTag
                              key={index}
                              tag={tag}
                              isActive={tagsId.includes(tag.id)}
                              onClick={() => {
                                !tagsId.includes(tag.id)
                                  ? setTagsId((p) => [...p, tag.id])
                                  : setTagsId((p) =>
                                      p.filter((v) => v != tag.id)
                                    );

                                setAutoFetch((p) => p + 1);
                              }}
                            />
                          );
                        })
                      : [...Array(10)].map((_, index) => (
                          <CardTagSkeleton key={index} />
                        ))}
                  </div>
                </Grid>
                <Grid xs={12} sm={8}>
                  <div className="flex w-full flex-col">
                    <div
                      className={clsx(
                        "grid w-full grid-cols-1 gap-5",
                        (data?.infos?.length || 2) > 1 && "sm:grid-cols-2"
                      )}
                    >
                      {!loading
                        ? data?.infos?.map((info, index) => (
                            <CardNews
                              isRequest={isRequest}
                              info={info}
                              key={index}
                            />
                          ))
                        : [...Array(4)].map((_, index) => (
                            <CardNewsSkeleton key={index} />
                          ))}
                    </div>
                  </div>
                </Grid>
                <Grid xs={0} sm={4}>
                  <div className="flex w-full flex-col">
                    {!loading ? (
                      <TagsFilterComponent
                        tags={data?.tags || []}
                        tagsId={tagsId}
                        isRequest={isRequest}
                        onClickSelectTag={handleClickSelectTag}
                        onClickUpdate={handleFetchWithTags}
                      />
                    ) : (
                      <TagsFilterSkeleton />
                    )}
                  </div>
                </Grid>
              </Grid.Container>
            )}
          </div>
        </div>
      </WithNavbar>
    </>
  );
};

export default News;
