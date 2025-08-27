import { CardSection } from "@/components/common/layout/CardSection";
import { formatCurrency } from "@/utils/format";
import { WeekdaySummary } from "../../../types/MonthlyStatisticsType";
import EChartsReact from "echarts-for-react";
import { useWeekdaySpendingChart } from "./useWeekdaySpendingChart";
import { useWeekdaySpendingAverage } from "./useWeekdaySpendingAverage";

export const MonthlyExpensesByDay = ({
  weekdayCategoryAverage,
}: {
  weekdayCategoryAverage: WeekdaySummary[];
}) => {
  const { chartOption } = useWeekdaySpendingChart(weekdayCategoryAverage);
  const { weekdayAvg, weekendAvg } = useWeekdaySpendingAverage(
    weekdayCategoryAverage
  );
  return (
    <CardSection title="요일별 평균 지출">
      <div className="h-80 px-2">
        <EChartsReact option={chartOption} style={{ height: "100%" }} />
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
