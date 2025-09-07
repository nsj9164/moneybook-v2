import { TransactionFiltersState } from "../../../types/filters";
import { CategorySaved, PayMethodSaved } from "@/types";
import { Filter } from "lucide-react";
import { FilterInputText } from "../inputs/FilterInputText";
import { FilterSelect } from "../inputs/FilterSelect";

interface FilterPanelProps {
  filters: TransactionFiltersState;
  handleFiltersChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  resetFilters: () => void;
  categories: CategorySaved[];
  payMethods: PayMethodSaved[];
}

export const FilterPanel = ({
  filters,
  handleFiltersChange,
  resetFilters,
  categories,
  payMethods,
}: FilterPanelProps) => {
  const { filterQuery, filterCategory, filterPayMethod } = filters;
  return (
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div>
        <label
          htmlFor="search"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          검색
        </label>
        <FilterInputText
          value={filterQuery}
          onChange={(e) => handleFiltersChange(e)}
        />
      </div>

      <FilterSelect
        label="카테고리"
        name="filterCategory"
        value={filterCategory}
        options={categories}
        onChange={(e) => handleFiltersChange(e)}
      />

      <FilterSelect
        label="결제 수단"
        name="filterPayMethod"
        value={filterPayMethod}
        options={payMethods}
        onChange={(e) => handleFiltersChange(e)}
      />

      <div className="flex items-end">
        <button
          type="button"
          onClick={resetFilters}
          className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
        >
          <Filter className="mr-2 -ml-1 h-4 w-4" />
          필터 초기화
        </button>
      </div>
    </div>
  );
};
