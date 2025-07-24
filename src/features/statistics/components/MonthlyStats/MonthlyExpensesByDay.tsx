import { CardSection } from "@/components/common/layout/CardSection";
import { formatCurrency } from "@/utils/format";
import { ArrowRight } from "lucide-react";
import { WeekdaySummary } from "../../types/MonthlyStatistics";
import EChartsReact from "echarts-for-react";
import { useMemo } from "react";

type TooltipParam = {
  name: string;
  value: number;
  data: { value: number; total: number };
};

export const MonthlyExpensesByDay = ({
  weekdayCategoryAverage,
}: {
  weekdayCategoryAverage: WeekdaySummary[];
}) => {
  const weekdays = ["월", "화", "수", "목", "금", "토", "일"];

  // 요일별 총합 평균 계산
  const datePerDay = useMemo(() => {
    return Array.from({ length: 7 }, (_, idx) => {
      const found = weekdayCategoryAverage.find((d) => d.weekday === idx);
      const totalAvg =
        found?.categories.reduce((sum, c) => sum + c.average, 0) ?? 0;
      return totalAvg;
    });
  }, [weekdayCategoryAverage]);

  const total = useMemo(
    () => datePerDay.reduce((sum, value) => sum + value, 0),
    [datePerDay]
  );

  const chartData = useMemo(() => {
    return datePerDay.map((amount) => ({
      value: total > 0 ? amount / total : 0,
      total: amount,
    }));
  }, [datePerDay, total]);

  const option = {
    tooltip: {
      trigger: "axis",
      formatter: (params: TooltipParam[]) => {
        const { data } = params[0];
        return `₩${formatCurrency(data.total)}`;
      },
      backgroundColor: "#ffffff",
      borderColor: "#e0e0e0",
      borderWidth: 1,
      textStyle: {
        color: "#333",
        fontSize: 12,
      },
    },
    grid: {
      left: 40,
      right: 20,
      top: 30,
      bottom: 40,
    },
    xAxis: {
      type: "category",
      data: weekdays,
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: {
        fontSize: 12,
        color: "#666",
      },
    },
    yAxis: {
      type: "value",
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        formatter: (val: number) => `${(val * 100).toFixed(0)}%`,
        fontSize: 12,
        color: "#999",
      },
      splitLine: {
        lineStyle: {
          type: "dashed",
          color: "#eee",
        },
      },
    },
    series: [
      {
        name: "평균 지출 비율",
        type: "bar",
        barWidth: "40%",
        label: {
          show: false,
        },
        itemStyle: {
          borderRadius: 6,
        },
        data: chartData,
      },
    ],
  };

  const weekdayAverages = useMemo(() => {
    return weekdayCategoryAverage.map(({ weekday, categories }) => {
      const total = categories.reduce((sum, c) => sum + c.average, 0);
      return { weekday, total };
    });
  }, [weekdayCategoryAverage]);

  const calcAvg = (days: number[]) => {
    const filtered = weekdayAverages.filter((d) => days.includes(d.weekday));
    const sum = filtered.reduce((s, d) => s + d.total, 0);
    return filtered.length > 0 ? sum / filtered.length : 0;
  };

  const weekdayAvg = calcAvg([0, 1, 2, 3, 4]);
  const weekendAvg = calcAvg([5, 6]);

  return (
    <CardSection
      title="요일별 평균 지출"
      action={
        <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center">
          <span>상세 보기</span>
          <ArrowRight className="ml-1 h-4 w-4" />
        </button>
      }
    >
      <div className="h-80 px-2">
        <EChartsReact option={option} style={{ height: "100%" }} />
      </div>
      <div className="mt-6 grid grid-cols-7 gap-2 text-center text-sm font-medium">
        <div className="col-span-5 bg-[#f0f9ff] p-3 rounded-xl">
          <div className="text-blue-700 mb-1">평일 평균</div>
          <div className="text-lg text-blue-600 font-bold">
            {formatCurrency(weekdayAvg)}
          </div>
        </div>
        <div className="col-span-2 bg-[#fff7ed] p-3 rounded-xl">
          <div className="text-orange-700 mb-1">주말 평균</div>
          <div className="text-lg text-orange-600 font-bold">
            {formatCurrency(weekendAvg)}
          </div>
        </div>
      </div>
    </CardSection>
  );
};
