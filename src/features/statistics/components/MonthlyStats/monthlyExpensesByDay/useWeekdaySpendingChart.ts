import { useMemo } from "react";
import { formatCurrency } from "@/utils/format";
import { WeekdaySummary } from "@/features/statistics/types/MonthlyStatistics";

type TooltipParam = {
  dataIndex: number;
  data: {
    value: number;
    original: number;
  };
};

export const useWeekdaySpendingChart = (
  weekdayCategoryAverage: WeekdaySummary[]
) => {
  const weekdays = ["월", "화", "수", "목", "금", "토", "일"];

  const chartData = useMemo(() => {
    return Array.from({ length: 7 }, (_, idx) => {
      const found = weekdayCategoryAverage.find((d) => d.weekday === idx);
      const totalAvg =
        found?.categories.reduce((sum, c) => sum + c.average, 0) ?? 0;
      return {
        value: totalAvg / 10000,
        original: totalAvg,
      };
    });
  }, [weekdayCategoryAverage]);

  const option = useMemo(() => {
    return {
      tooltip: {
        trigger: "axis",
        formatter: (params: TooltipParam[]) => {
          const data = params[0]?.data;
          const index = params[0]?.dataIndex;
          const day = weekdays[index];
          return `${day}요일<br/>지출: ₩${formatCurrency(data.original)}`;
        },
        backgroundColor: "#ffffff",
        borderColor: "#e0e0e0",
        borderWidth: 1,
        textStyle: { color: "#333", fontSize: 12 },
      },
      grid: { left: 60, right: 20, top: 30, bottom: 40 },
      xAxis: {
        type: "category",
        data: weekdays,
        axisTick: { show: false },
        axisLine: { show: false },
        axisLabel: { fontSize: 12, color: "#666" },
      },
      yAxis: {
        type: "value",
        axisLabel: {
          formatter: (val: number) => `${val.toFixed(1)}`,
          fontSize: 12,
          color: "#999",
        },
        splitLine: { lineStyle: { type: "dashed", color: "#eee" } },
      },
      series: [
        {
          name: "요일별 지출",
          type: "bar",
          barWidth: "40%",
          itemStyle: { borderRadius: 6 },
          data: chartData,
        },
      ],
    };
  }, [chartData]);

  return { chartOption: option };
};
