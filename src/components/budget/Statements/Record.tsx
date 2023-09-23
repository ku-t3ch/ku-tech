import { FC } from "react";
import { Collapse, Text, Avatar } from "@nextui-org/react";
import { Table, Tooltip } from "antd";

interface Props {
  title: string | null;
  isMobile: boolean;
  start_date: Date;
  ended_date: Date;
}

const Record: FC<Props> = ({ title, isMobile, start_date, ended_date }) => {
  const dateLocale = (dateTime: Date) => {
    return dateTime.toLocaleString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  return (
    <Collapse
      divider
      title={
        <Tooltip title={isMobile ? title : ""}>
          <Text h4 b className="w-[47.5vw] truncate">
            {title}
          </Text>
        </Tooltip>
      }
      subtitle={
        <Text size="$sm" color="#767F83" className="w-[47.5vw] truncate">
          {dateLocale(start_date)} ถึง {dateLocale(ended_date)}
        </Text>
      }
      contentLeft={
        <Avatar
          size="lg"
          src="https://scontent.fkdt3-1.fna.fbcdn.net/v/t39.30808-6/361608918_204565819250156_4177714372965498165_n.jpg?_nc_cat=102&cb=99be929b-59f725be&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeHBQ0ZWdVGvY14M6P2utUIGqMqWJEnP0MWoypYkSc_QxUMdAs8y9GOfJSEUPAxMPFRMHGg7LFnPPZZP3nurs6vF&_nc_ohc=GiSRie10hhQAX-5ST8M&_nc_ht=scontent.fkdt3-1.fna&oh=00_AfCvNZfCuRmdp4hpcrrg45kaP_rxntOd6428YI_J57Mksw&oe=64C98DB7"
          color="secondary"
          bordered
          squared
        />
      }
    >
      <div className="p-5">
        <Table dataSource={dataSource} columns={columns} className="stm_table" />
      </div>
    </Collapse>
  );
};

export default Record;
