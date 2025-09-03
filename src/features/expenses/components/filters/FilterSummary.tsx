import { ExpenseFiltersState } from "../../types/filters";
import { X } from "lucide-react";

interface FilterSummaryProps {
  filters: ExpenseFiltersState;
  resetFilters: () => void;
  resetField: (e: React.MouseEvent<HTMLButtonElement>) => void;
  categoryLabel: string;
  payMethodLabel: string;
}

export const FilterSummary = ({
  filters,
  resetFilters,
  resetField,
  categoryLabel,
  payMethodLabel,
}: FilterSummaryProps) => {
  return (
    <div className="mb-6 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-700">적용된 필터</h3>
        <button
          type="button"
          onClick={resetFilters}
          className="text-xs text-emerald-600 font-medium hover:text-emerald-700"
        >
          모두 초기화
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {filters.filterQuery && (
          <div className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1.5 text-sm">
            <span className="font-medium text-gray-800 mr-1">검색:</span>
            <span className="text-gray-600">{filters.filterQuery}</span>
            <button
              type="button"
              onClick={resetField}
              className="ml-2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        )}
        {filters.filterCategory !== 0 && (
          <div className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1.5 text-sm">
            <span className="font-medium text-blue-700 mr-1">카테고리:</span>
            <span className="text-blue-600">{categoryLabel}</span>
            <button
              type="button"
              onClick={resetField}
              className="ml-2 text-blue-400 hover:text-blue-600"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        )}
        {filters.filterPayMethod !== 0 && (
          <div className="inline-flex items-center rounded-full bg-purple-50 px-3 py-1.5 text-sm">
            <span className="font-medium text-purple-700 mr-1">결제수단:</span>
            <span className="text-purple-600">{payMethodLabel}</span>
            <button
              type="button"
              onClick={resetField}
              className="ml-2 text-purple-400 hover:text-purple-600"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        )}
        {filters.filterDifferentAmountOnly && (
          <div className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1.5 text-sm">
            <span className="text-amber-700">결제/실제금액 상이</span>
            <button
              type="button"
              onClick={resetField}
              className="ml-2 text-amber-400 hover:text-amber-600"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        )}
        {filters.filterRecurringOnly && (
          <div className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1.5 text-sm">
            <span className="text-emerald-700">정기지출</span>
            <button
              type="button"
              onClick={resetField}
              className="ml-2 text-emerald-400 hover:text-emerald-600"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        )}
        {(filters.startDate || filters.endDate) && (
          <div className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1.5 text-sm">
            <span className="font-medium text-indigo-700 mr-1">기간:</span>
            <span className="text-indigo-600">
              {filters.startDate || "처음"} ~ {filters.endDate || "현재"}
            </span>
            <button
              type="button"
              onClick={resetField}
              className="ml-2 text-indigo-400 hover:text-indigo-600"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
