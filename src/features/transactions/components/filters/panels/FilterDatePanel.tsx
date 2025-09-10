import { Calendar } from "lucide-react";
import { getQuickPeriodRange } from "@/features/transactions/utils/getDateRange";
import {
  DateOptions,
  MonthlyDateProps,
} from "@/features/transactions/types/filters";
import { DateSelector } from "@/components/monthSelector/DateSelector";
import { filterDateOptions } from "@/features/transactions/constants/filterDateOptions";
import { FilterSelectDate } from "../inputs/FilterSelectDate";

interface FilterDatePanelProps {
  startDate: string;
  endDate: string;
  handleFiltersChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  monthlyDateFilters: MonthlyDateProps;
}

export const FilterDatePanel = ({
  startDate,
  endDate,
  handleFiltersChange,
  monthlyDateFilters,
}: FilterDatePanelProps) => {
  const { selectedDate, years, handleChangeYear, handleChangeMonth } =
    monthlyDateFilters;

  const handleQuickPeriod = (period: string) => {
    const { startDate, endDate } = getQuickPeriodRange(period);

    handleFiltersChange({
      target: { name: "startDate", value: startDate },
    } as React.ChangeEvent<HTMLInputElement>);
    handleFiltersChange({
      target: { name: "endDate", value: endDate },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className="mb-6 bg-gray-50 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-900 flex items-center">
          <Calendar className="mr-2 h-4 w-4" />
          기간 선택
        </h3>
      </div>

      {/* 빠른 기간 선택 버튼들 */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {filterDateOptions.map((option: DateOptions) => (
            <button
              key={option.value}
              onClick={() => handleQuickPeriod(option.value)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                quickPeriod === option.value
                  ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* 월별 선택 및 사용자 정의 기간 */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <DateSelector
          selectedDate={selectedDate}
          years={years}
          handleChangeYear={handleChangeYear}
          handleChangeMonth={handleChangeMonth}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <FilterSelectDate
          label="시작일"
          name="startDate"
          value={startDate}
          onChange={handleFiltersChange}
        />
        <FilterSelectDate
          label="종료일"
          name="endDate"
          value={endDate}
          onChange={handleFiltersChange}
        />
      </div>
    </div>
  );
};
