import { ExpenseFiltersState } from "../../types/filters";
import { CategorySaved, PayMethodSaved } from "@/types";
import { Filter, X } from "lucide-react";
import { FilterCheckbox } from "./inputs/FilterCheckbox";
import { FilterDateRange } from "./inputs/FilterDateRange";
import { FilterInputText } from "./inputs/FilterInputText";
import { FilterSelect } from "./inputs/FilterSelect";

interface FilterPanelProps {
  filters: ExpenseFiltersState;
  handleFiltersChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  resetFilters: () => void;
  toggleFilterPanel: () => void;
  categories: CategorySaved[];
  payMethods: PayMethodSaved[];
}

export const FilterPanel = ({
  filters,
  handleFiltersChange,
  resetFilters,
  toggleFilterPanel,
  categories,
  payMethods,
}: FilterPanelProps) => {
  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-900">필터 설정</h2>
        <button
          type="button"
          onClick={toggleFilterPanel}
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
          startDate={filters.startDate}
          endDate={filters.endDate}
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
          onClick={resetFilters}
        >
          <Filter className="mr-2 -ml-1 h-4 w-4" />
          필터 초기화
        </button>
      </div>
    </div>
  );
};
