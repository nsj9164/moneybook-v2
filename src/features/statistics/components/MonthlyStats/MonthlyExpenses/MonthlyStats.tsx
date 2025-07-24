import { CardSection } from "@/components/common/layout/CardSection";
import { CategorySummary } from "@/features/statistics/types/MonthlyStatistics";
import { useState, useMemo } from "react";
import { ToggleIncomeExpenses } from "../ToggleIncomeExpenses";
import EChartsReact from "echarts-for-react";

interface MonthlyStatsProps {
  categorySummary: {
    income: CategorySummary[];
    expense: CategorySummary[];
  };
}

export const MonthlyStats = ({ categorySummary }: MonthlyStatsProps) => {
  const [showIncome, setShowIncome] = useState(false);
  const toggleIncomeExpenses = () => setShowIncome((prev) => !prev);

  const safeIncome = categorySummary?.income ?? [];
  const safeExpense = categorySummary?.expense ?? [];

  const incomeOption = useMemo(() => {
    return {
      title: {
        text: "수입 추이",
        left: "center",
        textStyle: {
          fontSize: 16,
          fontWeight: "bold",
        },
      },
      tooltip: { trigger: "axis" },
      grid: { left: 30, right: 30, top: 50, bottom: 40 },
      xAxis: {
        type: "category",
        data: safeIncome.map((item) => item.category),
        axisLabel: { rotate: 30 },
      },
      yAxis: { type: "value" },
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
  }, [safeIncome]);

  const expenseOption = useMemo(() => {
    return {
      title: {
        text: "지출 비교",
        left: "center",
        textStyle: {
          fontSize: 16,
          fontWeight: "bold",
        },
      },
      tooltip: { trigger: "axis" },
      legend: { bottom: 0 },
      grid: { left: 30, right: 30, top: 50, bottom: 70 },
      dataset: {
        source: [
          ["category", "이번달", "지난달"],
          ...safeExpense.map((item) => [
            item.category,
            item.currentAmount ?? 0,
            item.previousAmount ?? 0,
          ]),
        ],
      },
      xAxis: {
        type: "category",
        axisLabel: {
          formatter: function (value: string) {
            const match = safeExpense.find((c) => c.category === value);
            const total =
              (match?.currentAmount ?? 0) + (match?.previousAmount ?? 0);
            return `${value}\n₩${total.toLocaleString()}`;
          },
          fontSize: 12,
          lineHeight: 18,
        },
      },
      yAxis: {},
      series: [
        {
          name: "이번달",
          type: "bar",
          encode: { x: "category", y: "이번달" },
          itemStyle: { borderRadius: [4, 4, 0, 0] },
        },
        {
          name: "지난달",
          type: "bar",
          encode: { x: "category", y: "지난달" },
          itemStyle: { borderRadius: [4, 4, 0, 0] },
        },
      ],
    };
  }, [safeExpense]);

  return (
    <CardSection
      title="카테고리별 월별 추이"
      action={
        <ToggleIncomeExpenses
          showIncome={showIncome}
          toggleIncomeExpenses={toggleIncomeExpenses}
        />
      }
    >
      <EChartsReact
        option={showIncome ? incomeOption : expenseOption}
        style={{ height: 350, width: "100%" }}
        notMerge
        lazyUpdate
      />
    </CardSection>
  );
};
