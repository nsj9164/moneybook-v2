import { EChartsOption } from "echarts";
import { MonthlyFinance } from "@/features/statistics/types/YearlyStatistics";

export const monthlyFinanceOption = (
  monthlyFinance: MonthlyFinance[]
): EChartsOption => {
  const months = monthlyFinance.map((m) => `${m.month}월`);
  const incomeData = monthlyFinance.map((m) => m.income);
  const expenseData = monthlyFinance.map((m) => m.expense);
  const savingData = monthlyFinance.map((m) => m.saving);

  return {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      data: ["수입", "지출", "저축"],
    },
    toolbox: {
      show: true,
      orient: "vertical",
      left: "right",
      top: "center",
      feature: {
        saveAsImage: { show: true },
      },
    },
    xAxis: {
      type: "category",
      axisTick: { show: false },
      data: months,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "수입",
        type: "bar",
        label: { show: true, position: "top" },
        data: incomeData,
      },
      {
        name: "지출",
        type: "bar",
        label: { show: true, position: "top" },
        data: expenseData,
      },
      {
        name: "저축",
        type: "bar",
        label: { show: true, position: "top" },
        data: savingData,
      },
    ],
  };
};
