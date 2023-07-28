import { NextPage } from "next";
import { api } from "@/utils/api";

import tw from "tailwind-styled-components";

import Sponsor from "@/components/budget/Sponsor";
import PieChart from "@/components/budget/PieChart";
import ProjectList from "@/components/budget/ProjectList";
import ProjectSpending from "@/components/budget/ProjectSpending";

interface Props {}

const Budget: NextPage<Props> = () => {
  const budget = api.budget.getBudget.useQuery();
  const sponsor = api.budget.getSponsor.useQuery();

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

  const getAllProjects = () => {
    return budget.data?.projectUse ?? [];
  };

  return (
    <>
      <div className="py-[5rem] text-center">
        <span className="text-[1.8rem] font-bold">งบประมาณรายจ่าย</span>
      </div>
      <Container>
        <Grid>
          <div className="lg:col-span-1">
            <PieChart data={getReceivedBudget()} />
          </div>
          <div className="flex flex-col gap-3 lg:col-span-2">
            <ProjectSpending />
            <ProjectList data={getAllProjects()} />
          </div>
        </Grid>
        <Sponsor data={sponsor.data ?? []} />
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
