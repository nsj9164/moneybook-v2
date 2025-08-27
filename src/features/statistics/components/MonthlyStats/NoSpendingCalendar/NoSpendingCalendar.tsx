import { Calendar } from "lucide-react";
import { ChangeIndicator } from "../../../../../components/summaryCard/ChangeIndicator";
import { NoSpendingDaysSummary } from "../../../types/MonthlyStatisticsType";
import clsx from "clsx";
import { eachDayOfInterval, endOfMonth, format, startOfMonth } from "date-fns";

export const NoSpendingCalendar = ({
  noSpendingDays,
  targetDate,
}: {
  noSpendingDays: NoSpendingDaysSummary;
  targetDate: string;
}) => {
  const { currentMonth, previousMonth, currentMonthDays } = noSpendingDays;

  const currentMonthDaysSet = new Set(currentMonthDays);

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(targetDate),
    end: endOfMonth(targetDate),
  });

  const calendarData = daysInMonth.map((date) => {
    const day = date.getDate();
    return {
      day,
      isNoSpending: currentMonthDaysSet.has(day),
    };
  });

  const isIncrease = currentMonth - previousMonth > 0;
  const changeRate =
    previousMonth === 0
      ? 0
      : Math.round(((currentMonth - previousMonth) / previousMonth) * 100);

  const isThisMonth =
    format(new Date(), "yyyy-MM") === format(targetDate, "yyyy-MM");

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center">
          <Calendar className="h-5 w-5 text-emerald-500 mr-2" />
          <h2 className="text-lg font-semibold text-gray-900">무지출 캘린더</h2>
        </div>
      </div>
      <div className="p-6">
        {/* 무지출 통계 */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-600 mb-1">
              {currentMonth}일
            </div>
            <div className="text-xs text-gray-600">이번 달 무지출</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-900 mr-2">
                {previousMonth}일
              </span>
              <ChangeIndicator ratio={changeRate} isIncrease={isIncrease} />
            </div>
            <div className="text-xs text-gray-600">지난 달 대비</div>
          </div>
        </div>

        {/* 캘린더 - 새로운 스타일 적용 */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
            <div
              key={day}
              className="text-center text-xs font-medium text-gray-500 py-1"
            >
              {day}
            </div>
          ))}
          {calendarData.map((day) => (
            <div
              key={day.day}
              className={clsx(
                "aspect-square flex flex-col items-center justify-center text-xs rounded-md relative",
                isThisMonth && new Date().getDate() < day.day
                  ? "bg-gray-50 border border-gray-100 text-gray-400"
                  : day.isNoSpending
                  ? "bg-emerald-50 border border-emerald-200 text-gray-800"
                  : "bg-gray-50 border border-gray-200 text-gray-800"
              )}
            >
              <span className="text-sm font-medium text-gray-800">
                {day.day}
              </span>
            </div>
          ))}
        </div>

        {/* 새로운 범례 */}
        <div className="flex items-center justify-center space-x-4 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-emerald-50 rounded-sm border border-emerald-200 mr-1"></div>
            <span className="text-gray-600">무지출일</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-gray-50 rounded-sm border border-gray-200 mr-1"></div>
            <span className="text-gray-600">지출일</span>
          </div>
        </div>
      </div>
    </div>
  );
};
