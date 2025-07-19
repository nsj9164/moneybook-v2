import { Calendar } from "lucide-react";
import { ChangeIndicator } from "../../../../../components/summaryCard/ChangeIndicator";
import { NoSpendingDaysSummary } from "../../../types/MonthlyStatistics";
import { CardSection } from "@/components/common/layout/CardSection";

export const NoSpendingCalendar = ({
  noSpendingDays,
}: {
  noSpendingDays: NoSpendingDaysSummary;
}) => {
  const { currentMonth, previousMonth, yearToDate, currentMonthDays } =
    noSpendingDays;

  const calendarData = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    noSpendingDays: currentMonthDays,
  }));

  return (
    <>
      <CardSection title="무지출 캘린더"></CardSection>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-emerald-500 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">
              무지출 캘린더
            </h2>
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
                <ChangeIndicator
                  current={currentMonth}
                  previous={previousMonth}
                  isPositiveGood={true}
                />
              </div>
              <div className="text-xs text-gray-600">지난 달 대비</div>
            </div>
          </div>

          {/* 캘린더 - 크기 줄임 */}
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
                className="aspect-square flex flex-col items-center justify-center text-xs rounded relative border border-gray-200"
              >
                {currentMonthDays.has(day.day) && (
                  <span className="text-sm mb-1">💰</span>
                )}
                <span className="text-xs text-gray-700">{day.day}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center space-x-4 text-xs">
            <div className="flex items-center">
              <span className="text-sm mr-2">💰</span>
              <span className="text-gray-600">무지출일</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600">숫자만: 지출일</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
