import { NextPage } from "next";
import { FileIcon } from "react-file-icon";

import { Icon } from "@iconify/react";
import { Table, Badge } from "@nextui-org/react";

import tw from "tailwind-styled-components";

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
    <Table
      lined
      shadow={false}
      containerCss={{
        height: "100%",
        border: 0,
        borderRadius: "1rem",
        background: "#16181A",
      }}
      css={{
        minWidth: "100%",
        height: "100%",
      }}
    >
      <Table.Header>
        {[...columns].map((val, idx) => {
          return (
            <Table.Column
              key={val.key}
              css={{
                color: "#9ca6ad",
                background: "#202325",
                whiteSpace: "nowrap",
              }}
            >
              <div
                className="flex h-[2rem] items-center gap-1"
                style={{
                  justifyContent: val.align ?? "center",
                }}
              >
                <Icon icon={val.icon} className="text-[1rem]" />
                <span>{val.label}</span>
              </div>
            </Table.Column>
          );
        })}
      </Table.Header>
      <Table.Body
        items={data}
        css={{
          textAlign: "center",
        }}
      >
        {data.map((val, idx) => {
          const amount = val?.amount ?? 0;

          return (
            <Table.Row key={idx}>
              <Table.Cell>{idx + 1}</Table.Cell>
              <Table.Cell css={{ textAlign: "start" }}>{val.name}</Table.Cell>
              <Table.Cell>
                {amount > 0 ? (
                  <Badge
                    variant="flat"
                    color="primary"
                    isSquared
                    css={{
                      border: 0,
                    }}
                  >
                    {`${val.amount?.toLocaleString()} THB`}
                  </Badge>
                ) : (
                  <Badge
                    variant="flat"
                    color="default"
                    isSquared
                    css={{
                      border: 0,
                    }}
                  >
                    ไม่มีรายจ่าย
                  </Badge>
                )}
              </Table.Cell>
              <Table.Cell>
                <div className="flex justify-center">
                  <div
                    role="button"
                    className="w-[1rem]"
                    onClick={() => {
                      if (!val?.document_url) return;
                      window.open(val.document_url, "_blank", "noreferrer");
                    }}
                  >
                    <FileIcon type="document" extension="pdf" color="aliceblue" />
                  </div>
                </div>
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
      <Table.Pagination size="sm" noMargin align="center" rowsPerPage={3} />
    </Table>
  );
};

export default DocumentList;
