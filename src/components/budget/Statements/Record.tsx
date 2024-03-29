import { FC } from "react";
import { Tooltip } from "antd";
import { Icon } from "@iconify/react";
import { Collapse, Text, Avatar, Badge } from "@nextui-org/react";
import type { Spending } from "@/interfaces/BudgetInterface";

import SpendingList from "./SpendingList";
import tw from "tailwind-styled-components";
import KUTechLogo from "@/assets/KU-TECH-Logo-128x128.png";

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
      contentLeft={<Avatar size="lg" src={KUTechLogo.src} color="secondary" bordered squared />}
    >
      <div className="lg:py-[1rem] lg:px-[1rem]">
        {spendingData.length > 0 ? (
          <>
            <div className="space-y-[1rem] divide-y divide-dashed divide-[#494949]">
              <Section>
                <UsingBudget
                  spending={getSumSpendingUse()}
                  receive={receive ?? 0}
                  balance={getBalance()}
                />
              </Section>
              <Section className="py-[1rem]">
                <SpendingList data={spendingData ?? []} />
              </Section>
            </div>
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

const EmptyRecord: FC = () => {
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

interface UsingBudgetProps {
  spending: number;
  receive: number;
  balance: number;
}

const UsingBudget: FC<UsingBudgetProps> = ({ spending, receive, balance }) => {
  return (
    <div className="grid w-full grid-cols-1 gap-2 sm:flex sm:grid-cols-2 sm:justify-center">
      <Badge size="lg" variant="flat" color="primary" css={{ border: 0 }} isSquared>
        {`ใช้จำนวน: ${spending.toLocaleString()} / ${receive?.toLocaleString()} (THB)`}
      </Badge>
      <Badge size="lg" variant="flat" color="warning" css={{ border: 0 }} isSquared>
        คงเหลือ: {`${balance.toLocaleString()} THB`}
      </Badge>
    </div>
  );
};

const Section = tw.div`
  block
`;

export default Record;
