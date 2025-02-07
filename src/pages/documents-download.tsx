import FileComponent from "@/components/documents-download/FileComponent";
import { Document } from "@/interfaces/HygraphDocumentInterface";
import { gql, useQuery } from "@apollo/client";
import { Icon } from "@iconify/react";
import { Loading, Text } from "@nextui-org/react";
import { Button, Input, Select } from "antd";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

interface Props {}

const DocumentsDownload: NextPage<Props> = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [Sort, setSort] = useState("createdAt_DESC");
  const [IsRequesting, setIsRequesting] = useState(false);

  const { data, refetch } = useQuery<{
    documents: Document[];
  }>(
    gql`
      query ($search: String!, $orderBy: DocumentOrderByInput) {
        documents(orderBy: $orderBy, where: { _search: $search }) {
          id
          name
          createdAt
          file {
            mimeType
            fileName
            url
          }
        }
      }
    `,
    {
      variables: {
        search: "",
        orderBy: Sort,
      },
    }
  );

  //rebounce search
  useEffect(() => {
    const timeout = setTimeout(async () => {
      setIsRequesting(true);
      await refetch({
        search: searchTerm,
      });
      setIsRequesting(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  const handleChange = async (value: string) => {
    setSort(value);
    setIsRequesting(true);
    await refetch({
      search: searchTerm,
      orderBy: Sort,
    });
    setIsRequesting(false);
  };

  return (
    <div className="mx-auto w-full max-w-[73rem] flex-col gap-10 p-5 md:flex-row md:p-10">
      <div className="flex w-full flex-col gap-5">
        <Text className="prompt" size={"$3xl"}>
          ดาวน์โหลดเอกสารกลุ่ม
        </Text>
        <div className="flex w-full gap-3">
          <Input
            size="large"
            placeholder="ค้นหาไฟล์"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select
            size="large"
            defaultValue="createdAt_DESC"
            style={{ width: 120 }}
            onChange={handleChange}
          >
            <Select.Option value="createdAt_DESC">ล่าสุด</Select.Option>
            <Select.Option value="createdAt_ASC">เก่าสุด</Select.Option>
          </Select>
        </div>
        {IsRequesting ? (
          <div className="flex flex-col gap-3 p-[5rem]">
            <Loading />
          </div>
        ) : data && data?.documents.length > 0 ? (
          <div className="mt-3 flex gap-3">
            <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-2">
              {data?.documents.map((document, index) => (
                <FileComponent document={document} key={index} />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3 p-[5rem]">
            <Icon icon="mdi:file-document-multiple-outline" className="mx-auto text-[1.5rem]" />
            <span className="text-center">ไม่พบเอกสาร</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentsDownload;
