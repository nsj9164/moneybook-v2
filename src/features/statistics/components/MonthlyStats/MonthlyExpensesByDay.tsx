import { CardSection } from "@/components/common/layout/CardSection";
import { formatCurrency } from "@/utils/format";
import { ArrowRight } from "lucide-react";
import { WeekdaySummary } from "../../types/MonthlyStatistics";
import EChartsReact from "echarts-for-react";

type TooltipParam = {
  name: string;
  value: number;
};

type LabelParam = {
  value: number;
};

export const MonthlyExpensesByDay = ({
  weekdayCategoryAverage,
}: {
  weekdayCategoryAverage: WeekdaySummary[];
}) => {
  const weekdays = ["월", "화", "수", "목", "금", "토", "일"];

  const datePerDay = Array(7)
    .fill(0)
    .map((_, idx) => {
      const found = weekdayCategoryAverage.find((d) => d.weekday === idx);
      return found?.categories?.[0]?.average ?? 0;
    });

  const total = datePerDay.reduce((a, b) => a + b, 0);

  const dataRatio = datePerDay.map((v) => (total > 0 ? v / total : 0));

  const series = [
    {
      name: "평균 지출",
      type: "bar",
      barWidth: "60%",
      label: {
        show: true,
        formatter: ({ value }: LabelParam) => `${(value * 100).toFixed(1)}%`,
      },
      data: dataRatio,
    },
  ];

  const option = {
    tooltip: {
      trigger: "axis",
      formatter: (params: TooltipParam[]) => {
        const { name, value } = params[0];
        return `${name}: ${(value * 100).toFixed(1)}%`;
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

  const weekdayAverages = weekdayCategoryAverage.map(
    ({ weekday, categories }) => {
      const total = categories.reduce((sum, c) => sum + c.average, 0);
      return { weekday, total };
    }
  );

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
      <div className="h-80">
        <div className="h-full flex items-end justify-between space-x-4">
          <EChartsReact option={option} />
        </div>
      </div>
      <div className="mt-6 grid grid-cols-7 gap-2">
        <div className="col-span-5 text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-sm font-medium text-blue-700">평일 평균</div>
          <div className="text-lg font-bold text-blue-600">
            {formatCurrency(weekdayAvg)}
          </div>
        </div>
        <div className="col-span-2 text-center p-3 bg-orange-50 rounded-lg">
          <div className="text-sm font-medium text-orange-700">주말 평균</div>
          <div className="text-lg font-bold text-orange-600">
            {formatCurrency(weekendAvg)}
          </div>
        </div>
      </div>
    </CardSection>
  );
};
