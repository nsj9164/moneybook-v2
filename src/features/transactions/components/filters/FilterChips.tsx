import { ExpenseFiltersState } from "../../types/filters";
import { X } from "lucide-react";

interface FilterChipsProps {
  filters: ExpenseFiltersState;
  resetFilters: () => void;
  resetField: (e: React.MouseEvent<HTMLButtonElement>) => void;
  categoryLabel: string;
  payMethodLabel: string;
}

export const FilterChips = ({
  filters,
  resetFilters,
  resetField,
  categoryLabel,
  payMethodLabel,
}: FilterChipsProps) => {
  return (
    <div className="mb-6 bg-blue-50 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-medium text-blue-900">적용된 필터</h4>
        <span className="text-xs text-blue-600">
          {activeFiltersCount}개 적용됨
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {searchTerm && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            검색: {searchTerm}
            <button
              onClick={() => setSearchTerm("")}
              className="ml-1 text-blue-600 hover:text-blue-800"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        )}
        {selectedCategory !== "전체" && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            카테고리: {selectedCategory}
            <button
              onClick={() => setSelectedCategory("전체")}
              className="ml-1 text-purple-600 hover:text-purple-800"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        )}
        {selectedPaymentMethod !== "전체" && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            결제수단: {selectedPaymentMethod}
            <button
              onClick={() => setSelectedPaymentMethod("전체")}
              className="ml-1 text-green-600 hover:text-green-800"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        )}
        {(selectedMonth || startDate || endDate) && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
            기간:{" "}
            {selectedMonth
              ? monthOptions.find((m) => m.value === selectedMonth)?.label
              : `${startDate} ~ ${endDate}`}
            <button
              onClick={() => {
                setSelectedMonth("");
                setStartDate("");
                setEndDate("");
                setQuickPeriod("");
              }}
              className="ml-1 text-orange-600 hover:text-orange-800"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        )}
        {showDifferentAmountOnly && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            결제금액≠실제지출
            <button
              onClick={() => setShowDifferentAmountOnly(false)}
              className="ml-1 text-yellow-600 hover:text-yellow-800"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        )}
        {showRecurringOnly && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
            정기지출만
            <button
              onClick={() => setShowRecurringOnly(false)}
              className="ml-1 text-indigo-600 hover:text-indigo-800"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        )}
      </div>
    </div>
  );
};
