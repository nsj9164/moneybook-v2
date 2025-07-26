import { EChartsOption } from "echarts";
import { MonthlyFinance } from "@/features/statistics/types/YearlyStatistics";

const DEFAULT_MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);

export function monthlyFinanceOption(
  monthlyFinance: MonthlyFinance[]
): EChartsOption {
  const dataMap = new Map<number, MonthlyFinance>();
  monthlyFinance.forEach((d) => dataMap.set(d.month, d));

  const incomeData = DEFAULT_MONTHS.map(
    (month) => dataMap.get(month)?.income ?? 0
  );
  const expenseData = DEFAULT_MONTHS.map(
    (month) => dataMap.get(month)?.expense ?? 0
  );
  const savingData = DEFAULT_MONTHS.map(
    (month) => dataMap.get(month)?.saving ?? 0
  );

  const option: EChartsOption = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      data: ["수입", "지출", "저축"],
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        data: DEFAULT_MONTHS.map((m) => `${m}월`),
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "수입",
        type: "bar",
        emphasis: { focus: "series" },
        data: incomeData,
        itemStyle: { color: "#10b981" },
      },
      {
        name: "지출",
        type: "bar",
        emphasis: { focus: "series" },
        data: expenseData,
        itemStyle: { color: "#ef4444" },
      },
      {
        name: "저축",
        type: "bar",
        emphasis: { focus: "series" },
        data: savingData,
        itemStyle: { color: "#3b82f6" },
      },
    ],
    animationDuration: 800,
  };

  return option;
}
