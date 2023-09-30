import { FC } from "react";
import { Icon } from "@iconify/react";
import { Badge, Table } from "@nextui-org/react";
import type { Spending } from "@/interfaces/BudgetInterface";

import tw from "tailwind-styled-components";

interface Props {
  data: Spending[];
}

const SpendingList: FC<Props> = ({ data }) => {
  const rowsPerPage = 5;
  const columns = [
    {
      key: "id",
      label: "รายการที่",
      icon: "ant-design:number-outlined",
    },
    {
      key: "name",
      label: "รายการ",
      icon: "mdi:shopping-outline",
      align: "start",
    },
    {
      key: "price",
      label: "จำนวน",
      icon: "dashicons:money-alt",
    },
  ];

  return (
    <Table
      lined
      shadow={false}
      containerCss={{
        height: "100%",
        border: 0,
        borderRadius: ".8rem",
      }}
      css={{
        height: "auto",
        minWidth: "100%",
        padding: 0,
      }}
      aria-label="spending-list"
    >
      <Table.Header>
        {columns.map((val) => {
          return (
            <Table.Column
              key={val.key}
              css={{
                fontSize: ".85rem",
                color: "#9ca6ad",
                background: "#202325",
                whiteSpace: "nowrap",
              }}
            >
              <div
                className="flex h-[2rem] items-center gap-1"
                style={{
                  justifyContent: val?.align ?? "center",
                }}
              >
                <Icon icon={val.icon ?? ""} className="text-[1rem]" />
                <span>{val.label}</span>
              </div>
            </Table.Column>
          );
        })}
      </Table.Header>
      <Table.Body
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
                <Badge
                  variant="flat"
                  color={amount > 0 ? "primary" : "error"}
                  isSquared
                  css={{ border: 0 }}
                >{`${val.amount?.toLocaleString()} THB`}</Badge>
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
      <Table.Pagination
        size="sm"
        noMargin
        align="center"
        rowsPerPage={data.length > rowsPerPage ? rowsPerPage : data.length}
      />
    </Table>
  );
};
const Header = {
  Main: tw.div`
    pb-[1rem]
  `,
  Title: tw.div`
    flex
    items-center
    gap-1
    font-bold
    text-[1rem]
  `,
  Description: tw.div`
    text-sm
    text-[#B2B2B2]
  `,
};

export default SpendingList;
