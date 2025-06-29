import { PageHeader } from "@/components/common/layout/PageHeader";
import { Bell, Calendar, ChevronDown, Plus, Search } from "lucide-react";

interface DashboardHeaderProps {
  monthSelector: { year: number; month: number };
  showMonthSelector: boolean;
  controlMonthSelector: () => void;
}

export const DashboardHeader = ({
  monthSelector,
  showMonthSelector,
  controlMonthSelector,
}: DashboardHeaderProps) => {
  return (
    <PageHeader title="대시보드" description="한눈에 보는 나의 재정 현황">
      <div className="relative">
        <button
          className="flex items-center bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          onClick={controlMonthSelector}
        >
          <Calendar className="h-4 w-4 text-gray-500 mr-2" />
          {monthSelector.year}년 {monthSelector.month}월
          <ChevronDown className="h-4 w-4 text-gray-500 ml-2" />
        </button>

        {showMonthSelector && (
          <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 p-3 z-10 w-64">
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                <button
                  key={month}
                  className={`px-3 py-2 text-sm rounded-md transition-colors ${
                    monthSelector.month === month
                      ? "bg-emerald-100 text-emerald-700 font-medium"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => {
                    setSelectedMonth(month.toString());
                    controlMonthSelector();
                  }}
                >
                  {month}월
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </PageHeader>
  );
};
