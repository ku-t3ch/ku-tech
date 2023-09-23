import { NextPage } from "next";
import { FileIcon } from "react-file-icon";

import { Icon } from "@iconify/react";
import { TBody, Table, Thead } from "./Table";

interface Project {
  name: string | null;
  amount: number | null;
  document_url: string | null;
}

interface Props {
  data?: Project[];
}

const columns = [
  {
    key: "id",
    label: "ลำดับ",
    icon: "ant-design:number-outlined",
  },
  {
    key: "project-name",
    label: "ชื่อโครงการ",
    icon: "ant-design:project-outlined",
    align: "start",
  },
  {
    key: "amount",
    label: "ได้รับจำนวน",
    icon: "dashicons:money-alt",
  },
  {
    key: "description",
    label: "รายละเอียด",
    icon: "solar:document-text-outline",
  },
];

const DocumentList: NextPage<Props> = ({ data = [] }) => {
  return (
    <Table.Container className="max-h-[18rem]">
      <Table.Main>
        <Thead.Main>
          <Thead.Tr>
            {columns.map((v, idx) => {
              return (
                <Thead.Th key={idx}>
                  <div
                    className="flex items-center justify-center gap-1"
                    style={{
                      justifyContent: v.align ?? "center",
                    }}
                  >
                    <Icon icon={v.icon ?? ""} />
                    <span className="whitespace-nowrap">{v.label}</span>
                  </div>
                </Thead.Th>
              );
            })}
          </Thead.Tr>
          <tr></tr>
        </Thead.Main>
        <TBody.Main>
          {data.map((v, idx) => {
            return (
              <TBody.Tr key={idx}>
                <TBody.Td className="p-[1rem]">{idx + 1}</TBody.Td>
                <TBody.Td className="text-start">{v.name}</TBody.Td>
                <TBody.Td>{v.amount?.toLocaleString()} THB</TBody.Td>
                <TBody.Td>
                  <div className="flex justify-center">
                    <div
                      role="button"
                      className="w-[1rem]"
                      onClick={() => {
                        if (!v?.document_url) return;
                        window.open(v.document_url, "_blank", "noreferrer");
                      }}
                    >
                      <FileIcon type="document" extension="pdf" color="aliceblue" />
                    </div>
                  </div>
                </TBody.Td>
              </TBody.Tr>
            );
          })}
        </TBody.Main>
      </Table.Main>
    </Table.Container>
  );
};

export default DocumentList;
