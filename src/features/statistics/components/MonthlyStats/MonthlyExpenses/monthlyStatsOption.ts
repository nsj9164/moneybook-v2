import { MonthlyStatsProps } from "@/features/statistics/types/MonthlyStatsProps";

type TooltipItem = {
  seriesName: string;
  marker: string;
  value: number | (string | number)[];
  name: string;
};

export const monthlyStatsOption = ({ categorySummary }: MonthlyStatsProps) => {
  const safeIncome = categorySummary?.income ?? [];
  const safeExpense = categorySummary?.expense ?? [];

  const formatYAxisLabel = (value: number) => {
    if (value >= 10000) return `${(value / 10000).toFixed(1)}`;
    return `${value.toLocaleString()}`;
  };

  const incomeOption = {
    title: {
      text: "수입 추이",
      left: "center",
      textStyle: { fontSize: 16, fontWeight: "bold" },
    },
    tooltip: {
      trigger: "axis",
      formatter: (params: TooltipItem[]) =>
        params
          .map(
            (p) =>
              `${p.marker} ${p.seriesName}: ₩${Number(
                Array.isArray(p.value) ? p.value.at(-1) : p.value
              ).toLocaleString()}`
          )
          .join("<br>"),
    },
    grid: { left: 50, right: 30, top: 60, bottom: 40 },
    xAxis: {
      type: "category",
      data: safeIncome.map((item) => item.category),
      axisLabel: { rotate: 30 },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: formatYAxisLabel,
        fontSize: 12,
        margin: 12,
      },
    },
    series: [
      {
        name: "이번달",
        data: safeIncome.map((item) => item.currentAmount ?? 0),
        type: "line",
        smooth: true,
        lineStyle: { width: 3 },
        symbol: "circle",
      },
    ],
  };

  const expenseOption = {
    title: {
      text: "지출 비교",
      left: "center",
      textStyle: { fontSize: 16, fontWeight: "bold" },
    },
    tooltip: {
      trigger: "axis",
      formatter: (params: TooltipItem[]) =>
        params
          .map((p) => {
            const value = Array.isArray(p.value)
              ? p.seriesName === "이번달"
                ? p.value[2]
                : p.value[1]
              : p.value;
            return `${p.marker} ${p.seriesName}: ₩${Number(
              value
            ).toLocaleString()}`;
          })
          .join("<br>"),
    },
    legend: { bottom: 0 },
    grid: { left: 50, right: 30, top: 60, bottom: 70 },
    dataset: {
      source: [
        ["category", "지난달", "이번달"],
        ...safeExpense.map((item) => [
          item.category,
          item.previousAmount ?? 0,
          item.currentAmount ?? 0,
        ]),
      ],
    },
    xAxis: {
      type: "category",
      axisLabel: {
        formatter: (value: string) => {
          const match = safeExpense.find((c) => c.category === value);
          const total =
            (match?.currentAmount ?? 0) + (match?.previousAmount ?? 0);
          return `${value}\n${total.toLocaleString()}`;
        },
        fontSize: 12,
        lineHeight: 18,
      },
    },
    yAxis: {
      axisLabel: {
        formatter: formatYAxisLabel,
        fontSize: 12,
        margin: 12,
      },
    },
    series: [
      {
        name: "지난달",
        type: "bar",
        encode: { x: "category", y: "지난달" },
        itemStyle: { borderRadius: [4, 4, 0, 0] },
      },
      {
        name: "이번달",
        type: "bar",
        encode: { x: "category", y: "이번달" },
        itemStyle: { borderRadius: [4, 4, 0, 0] },
      },
    ],
  };

  return { incomeOption, expenseOption };
};
