import { TransactionFiltersState } from "../../types/filters";
import { CategorySaved, PayMethodSaved } from "@/types";
import { Calendar } from "lucide-react";
import { FilterDateRange } from "./inputs/FilterInputDate";
import { filterDateOptions } from "../../constants/filterDateOptions";
import {
  getQuickPeriodRange,
  handleQuickPeriod,
} from "@/features/transactions/utils/getDateRange";
import { DateOptions } from "@/features/transactions/types/filters";

interface FilterDatePanelProps {
  filters: TransactionFiltersState;
  handleFiltersChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  resetFilters: () => void;
  categories: CategorySaved[];
  payMethods: PayMethodSaved[];
}

export const FilterDatePanel = ({
  filters,
  handleFiltersChange,
  resetFilters,
  categories,
  payMethods,
}: FilterDatePanelProps) => {
  const handleQuickPeriod = (period: string) => {
    const { selectedMonth, startDate, endDate } = getQuickPeriodRange(period);
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
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label
            htmlFor="month-select"
            className="block text-xs font-medium text-gray-700 mb-1"
          >
            월별 선택
          </label>
          <select
            id="month-select"
            value={selectedMonth}
            onChange={(e) => handleMonthSelect(e.target.value)}
            className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
          >
            {monthOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div> */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label
            htmlFor="year-select"
            className="block text-xs font-medium text-gray-700 mb-1"
          >
            연도 선택
          </label>
          <select
            id="year-select"
            value={selectedYear}
            onChange={(e) => {
              handleYearChange(e.target.value);
              setQuickPeriod("");
            }}
            className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
          >
            {yearOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="month-select"
            className="block text-xs font-medium text-gray-700 mb-1"
          >
            월 선택
          </label>
          <select
            id="month-select"
            value={selectedMonth}
            onChange={(e) => {
              handleMonthChange(e.target.value);
              setQuickPeriod("");
            }}
            disabled={!selectedYear}
            className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            {monthOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="start-date"
            className="block text-xs font-medium text-gray-700 mb-1"
          >
            시작일
          </label>
          <FilterDateRange />
        </div>

        <div>
          <label
            htmlFor="end-date"
            className="block text-xs font-medium text-gray-700 mb-1"
          >
            종료일
          </label>
          <FilterDateRange />
        </div>
      </div>
    </div>
  );
};
