import { ExpenseFiltersState } from "@/pages/Expenses/types/filters";
import { ICategory, IPayMethod } from "@/types/expense-types";
import { ChevronDown, Filter, Search, Settings, X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { FilterCheckbox } from "./filters/FilterCheckbox";
import { FilterDateRange } from "./filters/FilterDateRange";
import { FilterInputText } from "./filters/FilterInputText";
import { FilterSelect } from "./filters/FilterSelect";

interface ExpensesFilterPanelProps {
  filters: ExpenseFiltersState;
  handleFiltersChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  resetFilters: () => void;
  setIsFilterPanelOpen: Dispatch<SetStateAction<boolean>>;
  categories: ICategory[];
  payMethods: IPayMethod[];
  openColumnModal: () => void;
}

export const ExpensesFilterPanel = ({
  filters,
  handleFiltersChange,
  resetFilters,
  setIsFilterPanelOpen,
  categories,
  payMethods,
  openColumnModal,
}: ExpensesFilterPanelProps) => {
  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-900">필터 설정</h2>
        <button
          type="button"
          onClick={() => setIsFilterPanelOpen(false)}
          className="text-gray-400 hover:text-gray-500"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div className="relative">
          <label
            htmlFor="search"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            검색
          </label>
          <FilterInputText
            value={filters.filterQuery}
            onChange={(e) => handleFiltersChange(e)}
          />
        </div>

        {/* {label, name, value, options, onChange} */}
        <FilterSelect
          label="카테고리"
          name="filterCategory"
          value={filters.filterCategory}
          options={categories}
          onChange={(e) => handleFiltersChange(e)}
        />

        <FilterSelect
          label="결제 수단"
          name="filterPayMethod"
          value={filters.filterPayMethod}
          options={payMethods}
          onChange={(e) => handleFiltersChange(e)}
        />

        <FilterDateRange
          startDate={filters.filterStartDate}
          endDate={filters.filterEndDate}
          onChange={(e) => handleFiltersChange(e)}
        />
      </div>

      {/* 추가 필터 옵션 */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <FilterCheckbox
          label="결제금액과 실제지출이 다른 항목만 보기"
          name="different-amount"
          value={filters.filterDifferentAmountOnly}
          onChange={(e) => handleFiltersChange(e)}
        />

        <FilterCheckbox
          label="정기지출만 보기"
          name="recurring"
          value={filters.filterRecurringOnly}
          onChange={(e) => handleFiltersChange(e)}
        />
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          onClick={openColumnModal}
        >
          <Settings className="mr-2 -ml-1 h-4 w-4" />
          표시 항목 설정
        </button>
        <button
          type="button"
          className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          onClick={resetFilters}
        >
          <Filter className="mr-2 -ml-1 h-4 w-4" />
          필터 초기화
        </button>
      </div>
    </div>
  );
};
