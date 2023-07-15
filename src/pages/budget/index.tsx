import tw from 'tailwind-styled-components';

import BudgetSummary from '@/components/Budget/Layouts/BudgetSummary';
import ReceiveBudget from '@/components/Budget/Layouts/ReceivedBudget';
import PartySpending from '@/components/Budget/Layouts/PartySpending';

import { NextPage } from 'next';
import { api } from '@/utils/api';

import { Loading } from '@nextui-org/react';

const Container = tw.div`
  mx-auto
  flex
  w-full
  max-w-[65rem]
  xl:max-w-[90rem]
  flex-col
  px-[1rem]
`;

const Grid = tw.div`
  grid
  gap-[1rem]
  grid-cols-1
  xl:grid-cols-3
`;

const Col = tw.div`
  col-span-3
  flex
  flex-col
  gap-[1rem]
`;

const Budget: NextPage<{}> = () => {
  const budget = api.budgets.getLastBudget.useQuery();
  const party = api.budgets.getPartySpending.useQuery();

  if (budget.isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loading size="lg" />
      </div>
    );
  }

  const getTotalBudget: () => number = () => {
    const data = budget.data;
    return (data?.common_amount ?? 0) + (data?.others_amount ?? 0);
  };

  const getExpenseBudget: () => number = () => {
    let sum = 0;

    budget.data?.projectUse.map(({ spendingUse }) => {
      sum += spendingUse.reduce(
        (total, { amount }) => total + (amount ?? 0),
        0,
      );
    });

    return sum;
  };

  const getPartySpending = () => {
    return party.data?.map((v) => {
      return {
        name: v.name,
        amount: v.spendingUse.reduce((total, v) => total + (v?.amount ?? 0), 0),
      };
    });
  };

  return (
    <>
      <div className="py-[6rem] text-center">
        <div className="text-[2rem] font-bold">รายงานงบประมาณ</div>
      </div>
      <Container>
        <Grid>
          <Col className="xl:col-span-1">
            <ReceiveBudget
              titleBudget={budget.data?.name ?? ''}
              commonBudget={budget.data?.common_amount ?? 0}
              othersBudget={budget.data?.others_amount ?? 0}
            />
          </Col>
          <Col className="xl:col-span-2">
            <BudgetSummary
              totalProject={budget.data?.projectUse?.length ?? 0}
              expense={-1 * getExpenseBudget()}
              balance={getTotalBudget() - getExpenseBudget()}
            />
            <PartySpending
              totalBudget={getTotalBudget()}
              data={getPartySpending()}
            />
          </Col>
        </Grid>
      </Container>
    </>
  );
};

export default Budget;
