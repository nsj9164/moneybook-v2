import { CardSection } from "@/components/common/layout/CardSection";
import { formatCurrency } from "@/utils/format";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { WeekdaySummary } from "../../types/MonthlyStatistics";
import EChartsReact from "echarts-for-react";

export const MonthlyExpensesByDay = ({
  weekdayCategoryAverage,
}: {
  weekdayCategoryAverage: WeekdaySummary[];
}) => {
  const { weekday, categories } = weekdayCategoryAverage;

  const weekdays = ["월", "화", "수", "목", "금", "토", "일"];

  const datePerDay = Array(7)
    .fill(0)
    .map((_, idx) => {
      const found = weekdayCategoryAverage.find((d) => d.weekday === idx);
      if (found && found.categories.length > 0) {
        return found.categories[0].average;
      }
      return 0;
    });

  const total = dataPerDay.reduce((a, b) => a + b, 0);

  const dataRatio = dataPerDay.map((v) => (total > 0 ? v / total : 0));

  const series = [
    {
      name: "평균 지출",
      type: "bar",
      barWidth: "60%",
      label: {
        show: true,
        formatter: (params: any) => `${(params.value * 100).toFixed(1)}%`,
      },
      data: dataRatio,
    },
  ];

  const option = {
    tooltip: {
      trigger: "axis",
      formatter: (params: any) => {
        return `${params[0].name}: ${(params[0].value * 100).toFixed(1)}%`;
      },
    },
    grid: {
      left: 50,
      right: 30,
      top: 50,
      bottom: 50,
    },
    xAxis: {
      type: "category",
      data: weekdays,
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: (val: number) => `${(val * 100).toFixed(0)}%`,
      },
    },
    series,
  };

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
      <div className="h-80">
        <div className="h-full flex items-end justify-between space-x-4">
          <EChartsReact option={option} />
        </div>
      </div>
      <div className="mt-6 grid grid-cols-7 gap-2">
        <div className="col-span-5 text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-sm font-medium text-blue-700">평일 평균</div>
          <div className="text-lg font-bold text-blue-600">
            {formatCurrency(
              weekdayData
                .filter((day) =>
                  ["월", "화", "수", "목", "금"].includes(day.day)
                )
                .reduce((sum, day) => sum + day.avgExpense, 0) / 5
            )}
          </div>
        </div>
        <div className="col-span-2 text-center p-3 bg-orange-50 rounded-lg">
          <div className="text-sm font-medium text-orange-700">주말 평균</div>
          <div className="text-lg font-bold text-orange-600">
            {formatCurrency(
              weekdayData
                .filter((day) => ["토", "일"].includes(day.day))
                .reduce((sum, day) => sum + day.avgExpense, 0) / 2
            )}
          </div>
        </div>
      </div>
    </CardSection>
  );
};
