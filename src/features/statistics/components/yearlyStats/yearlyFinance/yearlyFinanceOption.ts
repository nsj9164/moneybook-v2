import { EChartsOption } from "echarts";
import { YearlyFinance } from "@/features/statistics/types/YearlyStatisticsType";

export function yearlyFinanceOption(
  yearlyData: YearlyFinance[]
): EChartsOption {
  const selectedYear = yearlyData[yearlyData.length - 1].year;
  const option: EChartsOption = {
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
    },
    legend: {
      data: ["수입", "지출", "저축"],
    },
    xAxis: {
      type: "category",
      data: yearlyData.map((d) => d.year.toString()),
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "수입",
        type: "bar",
        data: yearlyData.map((d) => ({
          value: d.income,
          itemStyle: {
            color: d.year === selectedYear ? "#10b981" : "#6ee7b7",
          },
        })),
      },
      {
        name: "지출",
        type: "bar",
        data: yearlyData.map((d) => ({
          value: d.expense,
          itemStyle: {
            color: d.year === selectedYear ? "#ef4444" : "#fca5a5",
          },
        })),
      },
      {
        name: "저축",
        type: "bar",
        data: yearlyData.map((d) => ({
          value: d.saving,
          itemStyle: {
            color: d.year === selectedYear ? "#3b82f6" : "#93c5fd",
          },
        })),
      },
    ],
    animationDuration: 800,
  };

  return option;
}
