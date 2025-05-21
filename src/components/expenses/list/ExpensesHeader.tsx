import { newExpensesState } from "@/recoil/atoms";
import { Filter, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";

interface ExpensesHeaderProps {
  chkListCnt: number;
  filterQuery: string;
  handleFiltersChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  isActiveFilters: boolean;
}

export const ExpensesHeader = ({
  chkListCnt,
  filterQuery,
  handleFiltersChange,
  isActiveFilters,
}: ExpensesHeaderProps) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">지출 관리</h1>
          <p className="mt-1 text-sm text-gray-500">
            모든 지출 내역을 관리하고 분석하세요. 총 {chkListCnt}개의 지출
            내역이 있습니다.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <input
              type="text"
              name="filterQuery"
              placeholder="지출 내역 검색..."
              value={filterQuery}
              onChange={(e) => handleFiltersChange(e)}
              className="block w-64 rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm pl-10"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
          </div>
          <button
            type="button"
            // onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
          >
            <Filter className="mr-1.5 -ml-0.5 h-4 w-4" />
            필터
            {isActiveFilters && (
              <span className="ml-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-xs font-medium text-emerald-700">
                {/* {activeFilterCount} */}
                1121111
              </span>
            )}
          </button>
          <Link
            to="/expenses/add"
            className="inline-flex items-center rounded-md bg-emerald-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700"
          >
            <Plus className="mr-1.5 -ml-0.5 h-4 w-4" />
            지출 추가
          </Link>
        </div>
      </div>
    </div>
  );
};
