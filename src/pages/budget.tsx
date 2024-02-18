import { NextPage } from "next";
import { api } from "@/utils/api";
import { Icon } from "@iconify/react";
import { Text } from "@nextui-org/react";
import { LoadingScreen } from "@/components/Loading";

import tw from "tailwind-styled-components";

import Sponsor from "@/components/budget/Sponsor";
import PieChart from "@/components/budget/PieChart";
import DocumentList from "@/components/budget/DocumentList";
import Balanch from "@/components/budget/Balanch";
import Statements from "@/components/budget/Statements";

interface ProjectFilter {
  budgetId?: string;
  orderBy: "desc" | "asc";
}

interface Props {}

const Budget: NextPage<Props> = () => {
  const budget = api.budget.getBudget.useQuery();
  const sponsor = api.budget.getSponsor.useQuery();

  const getCurrentBudgetName = () => {
    return budget?.data?.name ?? "ยังไม่มีชื่อโครงการประจำปี";
  };

  const getCurrentBudgetId = () => {
    return budget?.data?.id ?? null;
  };

  const getReceivedBudget = () => {
    return (
      budget.data?.received_amount.map((v) => {
        return {
          name: v.name,
          amount: v.amount,
        };
      }) ?? []
    );
  };

  const getProjectDocuments = () => {
    return budget.data?.projectUse ?? [];
  };

  if (budget.isLoading || sponsor.isLoading) {
    return <LoadingScreen />;
  }

  if (!budget.data || budget.data.projectUse.length < 1) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Text className="prompt" size={"$4xl"}>
            <Icon icon="mdi:money-off" />
          </Text>
          <Text className="prompt" size={"$xl"} b>
            ยังไม่มีข้อมูลงบประมาณประจำปี
          </Text>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="py-[5rem] text-center">
        <span className="text-[1.8rem] font-bold">{getCurrentBudgetName()}</span>
      </div>
      <Container>
        <Grid>
          <div className="lg:col-span-1">
            <PieChart data={getReceivedBudget()} />
          </div>
          <div className="flex flex-col gap-3 lg:col-span-2">
            <Balanch data={getReceivedBudget()} />
            <DocumentList data={getProjectDocuments()} />
          </div>
        </Grid>
        <Sponsor data={sponsor.data ?? []} />
        <Statements budgetId={getCurrentBudgetId()} />
      </Container>
    </>
  );
};

const Container = tw.div`
  px-5
  mx-auto
  w-full
  md:max-w-[70rem]
`;

const Grid = tw.div`
  grid
  grid-cols-1
  lg:grid-cols-3
  gap-3
`;

export default Budget;
