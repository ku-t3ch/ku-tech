import { FC } from "react";
import { Tooltip } from "antd";
import { Icon } from "@iconify/react";
import { Collapse, Text, Avatar, Badge, Divider, Progress } from "@nextui-org/react";
import type { Spending } from "@/interfaces/BudgetInterface";

import SpendingList from "./SpendingList";
import tw from "tailwind-styled-components";

interface Props {
  title: string | null;
  spendingData: Spending[];
  receive: number | null;
  start_date: Date;
  ended_date: Date;
  isMobile: boolean;
}

const Record: FC<Props> = ({ title, spendingData, receive, start_date, ended_date, isMobile }) => {
  const dateLocale = (dateTime: Date) => {
    return dateTime.toLocaleString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getSumSpendingUse = () => {
    return spendingData.reduce((accumulator, object) => {
      return accumulator + (object?.amount || 0);
    }, 0);
  };

  const getBalance = () => {
    return (receive || 0) - getSumSpendingUse();
  };

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
      <div className="lg:py-[1rem] lg:px-[1rem]">
        {spendingData.length > 0 ? (
          <>
            <Section>
              <div className="flex justify-center gap-2">
                <Badge size="lg" variant="flat" color="primary" css={{ border: 0 }} isSquared>
                  {`ใช้จำนวน: ${getSumSpendingUse().toLocaleString()} / ${receive?.toLocaleString()} (THB)`}
                </Badge>
                <Badge size="lg" variant="flat" color="warning" css={{ border: 0 }} isSquared>
                  คงเหลือ: {`${getBalance().toLocaleString()} THB`}
                </Badge>
              </div>
            </Section>
            <Section className="py-[1rem]">
              <SpendingList data={spendingData ?? []} />
            </Section>
          </>
        ) : (
          <div className="flex justify-center">
            <EmptyRecord />
          </div>
        )}
      </div>
    </Collapse>
  );
};

const EmptyRecord = () => {
  return (
    <Badge
      size="lg"
      isSquared
      variant="flat"
      color="default"
      css={{
        border: 0,
      }}
    >
      <div className="flex w-full items-center gap-1">
        <Icon icon="material-symbols:unknown-document-outline" className="text-[1.25rem]" />
        <span>ขออภัยไม่พบรายการงบประมาณ</span>
      </div>
    </Badge>
  );
};

const Section = tw.div`
  block
`;

export default Record;
