import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { prisma } from "@/server/db";
import { google } from "googleapis";
import { auth } from "@/utils/GoogleSheet";
import { env } from "@/env.mjs";
import _ from "lodash";

const service = google.sheets({ version: "v4", auth: auth });

type List = {
  name: string;
  amount: number;
};

enum SelectColumn {
  budget_list_from_income = 0,
  budget_list_form_subsidize = 2,
  expenses_list_from_income = 4,
  expenses_list_form_subsidize = 6,
  refund_list_from_income = 8,
}

const getList = (values: any, selectColumn: SelectColumn) => {
  const groupedData = _.chain(values?.slice(6))
    .filter((row) => row[selectColumn] !== "" && row[selectColumn+1]) // Remove empty rows
    .map((row) => ({
      name: row[selectColumn],
      amount: parseFloat(row[selectColumn+1].replace(",", "") ?? 0),
    }))
    .groupBy("name")
    .map((values, name) => ({
      name,
      amount: _.sumBy(values, "amount"),
    }))
    .value();
  return groupedData;
};

export const budgetRouter = createTRPCRouter({
  getBudget: publicProcedure.query(async () => {
    const result = await service.spreadsheets.values.get({
      spreadsheetId: env.BUDGET_SPREADS_SHEET_ID,
      range: "Main Page!A:J",
    });

    return {
      remaining_budget: parseFloat(result.data.values?.[0]?.[5].replace(",", "") ?? 0),
      budget_all: parseFloat(result.data.values?.[1]?.[3].replace(",", "") ?? 0),
      expenses_all: parseFloat(result.data.values?.[1]?.[7].replace(",", "") ?? 0),
      budget_from_income: parseFloat(result.data.values?.[3]?.[1].replace(",", "") ?? 0),
      budget_from_subsidize: parseFloat(result.data.values?.[3]?.[3].replace(",", "") ?? 0),
      expenses_from_income: parseFloat(result.data.values?.[3]?.[5].replace(",", "") ?? 0),
      expanses_from_subsidize: parseFloat(result.data.values?.[3]?.[7].replace(",", "") ?? 0),
      refund: parseFloat(result.data.values?.[1]?.[9].replace(",", "") ?? 0),
      budget_list_from_income: getList(result.data.values, SelectColumn.budget_list_from_income),
      budget_list_form_subsidize: getList(
        result.data.values,
        SelectColumn.budget_list_form_subsidize
      ),
      expenses_list_from_income: getList(
        result.data.values,
        SelectColumn.expenses_list_from_income
      ),
      expenses_list_from_subsidize: getList(
        result.data.values,
        SelectColumn.expenses_list_form_subsidize
      ),
      refund_list: getList(result.data.values, SelectColumn.refund_list_from_income),
    };
  }),
});
