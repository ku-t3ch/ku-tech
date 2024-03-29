import { NextPage } from "next";
import { api } from "@/utils/api";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useMediaQuery } from "usehooks-ts";
import { LoadingScreen } from "@/components/Loading";
import { useQuery } from "@tanstack/react-query";
import { BudgetResponseInterface } from "@/interfaces/BudgetResponseInterface";
import { Select } from "antd";
import { useState } from "react";
import _ from "lodash";
import Link from "next/link";

ChartJS.register(ArcElement, Tooltip, Legend);

type List = {
    name: string;
    amount: number;
};

const BG_COLORS = [
    "rgba(255, 99, 132, .5)",
    "rgba(54, 162, 235, .5)",
    "rgba(255, 206, 86, .5)",
    "rgba(75, 192, 192, .5)",
    "rgba(153, 102, 255, .5)",
    "rgba(255, 159, 64, .5)",
];

const BD_COLORS = [
    "rgba(255, 99, 132, 1)",
    "rgba(54, 162, 235, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(153, 102, 255, 1)",
    "rgba(255, 159, 64, 1)",
];

interface Props { }

const Budget: NextPage<Props> = () => {
    const [ListTypeBudget, setListTypeBudget] = useState<string>("budget_list_from_income");
    const [ListTypeExpenses, setListTypeExpenses] = useState<string>("expenses_list_from_income");

    const budget = useQuery<BudgetResponseInterface>({
        queryKey: ['repoData'],
        queryFn: () =>
            fetch('https://tech.nisit.ku.ac.th/kutechapi/budget').then((res) =>
                res.json(),
            ),
    })

    if (budget.isLoading) {
        return <LoadingScreen />;
    }

    const convertToCurrency = (num: number) => {
        if (num) {
            return num.toLocaleString("th-TH", { minimumFractionDigits: 2 }) ?? 0;
        } else {
            return "0.00";
        }
    };

    const CurrencyRender = <span className="text-lg">บาท</span>

    return (
        <div className="mx-auto w-full max-w-[73rem] flex-col gap-10 p-5 md:flex-row md:p-10">
            <div className="flex w-full flex-col gap-5">
                {/* <div className="text-center">
                    <Text className="prompt" size={"$3xl"}>
                        งบประมาณรายจ่าย
                    </Text>
                </div> */}
                <div className="flex gap-5 flex-col md:flex-row">
                    <div className="flex flex-col bg-gray-900 px-10 py-7 rounded-2xl gap-5 text-center w-full">
                        <div className="text-3xl">งบประมาณทั้งหมด</div>
                        <div className="text-3xl text-green-500 font-bold">+ {convertToCurrency(budget.data?.budget_all!!)} {CurrencyRender}</div>
                    </div>
                    <div className="flex flex-col bg-gray-900 px-10 py-7 rounded-2xl gap-5 text-center w-full">
                        <div className="text-3xl">รายจ่ายทั้งหมด</div>
                        <div className="text-3xl text-red-500 font-bold">- {convertToCurrency(budget.data?.expenses_all!!)} {CurrencyRender}</div>
                    </div>
                    <div className="flex flex-col bg-gray-900 px-10 py-7 rounded-2xl gap-5 text-center w-full">
                        <div className="text-3xl">คืนเงิน</div>
                        <div className="text-3xl text-yellow-500 font-bold">{convertToCurrency(budget.data?.refund!!)} {CurrencyRender}</div>
                    </div>
                </div>

                <div className="flex gap-5 flex-col md:flex-row">
                    <div className="flex flex-col bg-gray-900 px-10 py-7 rounded-2xl gap-5 w-full">
                        <div className="text-3xl">งบประมาณ</div>
                        <div className="flex flex-col">
                            <div className="text-xl">เงินรายได้</div>
                            <div className="text-3xl text-green-500 font-bold">+ {convertToCurrency(budget.data?.budget_from_income!!)} {CurrencyRender}</div>
                        </div>
                        <div className="flex flex-col">
                            <div className="text-xl">งบอุดหนุน</div>
                            <div className="text-3xl text-green-500 font-bold">+ {convertToCurrency(budget.data?.budget_from_subsidize!!)} {CurrencyRender}</div>
                        </div>
                    </div>
                    <div className="flex flex-col bg-gray-900 px-10 py-7 rounded-2xl gap-5 w-full">
                        <div className="text-3xl">รายจ่าย</div>
                        <div className="flex flex-col">
                            <div className="text-xl">เงินรายได้</div>
                            <div className="text-3xl text-red-500 font-bold">- {convertToCurrency(budget.data?.expenses_from_income!!)} {CurrencyRender}</div>
                        </div>
                        <div className="flex flex-col">
                            <div className="text-xl">งบอุดหนุน</div>
                            <div className="text-3xl text-red-500 font-bold">- {convertToCurrency(budget.data?.expanses_from_subsidize!!)} {CurrencyRender}</div>
                        </div>
                    </div>
                </div>
                <div className="grid md:grid-cols-3 gap-5 grid-cols-1">
                    <div className="flex flex-col bg-gray-900 px-10 py-7 rounded-2xl gap-5 w-full overflow-y-auto overflow-x-hidden relative max-h-[30rem] min-h-[30rem]">
                        <Select value={ListTypeBudget} defaultValue={ListTypeBudget} size="large" className="w-fit" onChange={(v) => {
                            setListTypeBudget(v)
                        }}>
                            <option value="budget_list_from_income">รายได้จากเงินรายได้</option>
                            <option value="budget_list_form_subsidize">รายได้จากงบอุดหนุน</option>
                        </Select>
                        <div className="flex flex-col gap-3">
                            {
                                budget.data![ListTypeBudget].map((v: any, i: any) => (
                                    <div className="flex flex-col bg-gray-800 rounded-xl p-3 px-4" key={i}>
                                        <div className="" >{v.name}</div>
                                        <div className="text-xl text-green-500 font-bold" >+ {convertToCurrency(v.amount)} {CurrencyRender}</div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="flex flex-col bg-gray-900 px-10 py-7 rounded-2xl gap-5 w-full overflow-y-auto overflow-x-hidden relative max-h-[30rem] min-h-[30rem]">
                        <Select value={ListTypeExpenses} defaultValue={ListTypeExpenses} size="large" className="w-fit" onChange={(v) => {
                            setListTypeExpenses(v)
                        }}>
                            <option value="expenses_list_from_income">รายจ่ายจากเงินรายได้</option>
                            <option value="expenses_list_from_subsidize">รายจ่ายจากงบอุดหนุน</option>
                        </Select>
                        <div className="flex flex-col gap-3">
                            {
                                budget.data![ListTypeExpenses].map((v: any, i: any) => (
                                    <div className="flex flex-col bg-gray-800 rounded-xl p-3 px-4" key={i}>
                                        <div className="" >{v.name}</div>
                                        <div className="text-xl text-red-500 font-bold" >- {convertToCurrency(v.amount)} {CurrencyRender}</div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="flex flex-col bg-gray-900 px-10 py-7 rounded-2xl gap-5 w-full overflow-y-auto overflow-x-hidden relative max-h-[30rem] min-h-[30rem]">
                        <Select size="large" className="w-fit" defaultValue="refund_list">
                            <option value="refund_list">รายการคืนเงิน</option>
                        </Select>
                        <div className="flex flex-col gap-3">
                            {
                                budget.data?.refund_list.map((v: any, i: any) => (
                                    <div className="flex flex-col bg-gray-800 rounded-xl p-3 px-4" key={i}>
                                        <div className="" >{v.name}</div>
                                        <div className="text-xl text-yellow-500 font-bold" >{convertToCurrency(v.amount)} {CurrencyRender}</div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Link href="/messaging" className="flex justify-center pt-10 text-center underline">
                <div>ร่วมแสดงความคิดเห็น <br /> หรือวิจารณ์การใช้จ่ายงบประมาณ</div>
            </Link>
        </div >
    );
};

export default Budget;


interface Props {
    data: List[]
}

function ChartRender(props: Props) {
    const isMobile = useMediaQuery("(max-width: 768px)");
    const dataToChart = (budget_list: List[]) => {
        let labels: string[] = [];
        let values: number[] = [];

        budget_list.map((v) => {
            labels = [...labels, v?.name ?? "ไม่ระบุ"];
        });

        budget_list.map((v) => {
            values = [...values, v.amount];
        });

        return {
            labels: labels,
            values: values,
        };
    }
    return (
        <div className="w-full max-h-[40rem] flex justify-center">
            <Doughnut options={{
                doughnut: {

                },
                plugins: {
                    legend: {
                        display: isMobile ? false : true,
                        position: "right",
                        labels: {
                            font: {
                                family: 'Noto Sans Thai',
                                size: 16,
                            }
                            ,
                            color: 'white',
                        }
                    },
                    tooltip: {
                        bodyFont: {
                            family: 'Noto Sans Thai',
                        },
                        titleFont: {
                            family: 'Noto Sans Thai',
                            size: 16,
                        }
                    },
                    // datalabels: {
                    //     color: 'white', // Set the color of data labels
                    //     font: {
                    //         family: 'Noto Sans Thai',
                    //         size: 14,
                    //     },
                    //     formatter: (value, ctx: any) => {
                    //         //percentage
                    //         const percentage = ((value / ctx.dataset.data.reduce((a: any, b: any) => a + b, 0)) * 100).toFixed(2);
                    //         return `${percentage}%`;
                    //     },
                    // },
                }
            }} data={{
                labels: dataToChart(props.data ?? []).labels,
                datasets: [
                    {
                        label: " จำนวน",
                        data: dataToChart(props.data ?? []).values,
                        backgroundColor: BG_COLORS,
                        borderColor: BD_COLORS,
                        borderWidth: 1,
                    },
                ],
            }} />
        </div>
    )
}
