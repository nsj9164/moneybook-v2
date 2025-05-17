import { useFetchCategories } from "@/hooks/useFetchCategories";
import { useFetchPayMethods } from "@/hooks/useFetchPayMethods";
import { IFilters } from "@/pages/Expenses";
import { Filter, Search } from "lucide-react";

export const ExpensesListNoFilteredData = ({
  filters,
  resetFilters,
}: {
  filters: IFilters;
  resetFilters: () => void;
}) => {
  const categories = useFetchCategories();
  const payMethods = useFetchPayMethods();
  return (
    <tr>
      <td colSpan={7} className="px-3 py-10 text-center">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-3">
            <Search className="h-6 w-6 text-gray-400" />
          </div>
          <h3 className="text-base font-medium text-gray-900 mb-1">
            검색 결과가 없습니다
          </h3>
          <p className="text-sm text-gray-500 mb-3 max-w-md">
            현재 적용된 필터와 일치하는 지출 내역을 찾을 수 없습니다.
          </p>
          <div className="bg-gray-50 rounded-md p-2 mb-3 max-w-md">
            <p className="text-sm text-gray-700">
              <span className="font-medium">적용된 필터:</span>{" "}
              {filters.itemName && (
                <span className="inline-flex items-center rounded-full bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-800 mr-1">
                  검색어: {filters.itemName}
                </span>
              )}
              {filters.categoryId !== 0 && (
                <span className="inline-flex items-center rounded-full bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-800 mr-1">
                  카테고리:{" "}
                  {
                    categories.find((item) => item.id === filters.categoryId)
                      ?.name
                  }
                </span>
              )}
              {filters.payMethodId !== 0 && (
                <span className="inline-flex items-center rounded-full bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-800">
                  결제 수단:{" "}
                  {
                    payMethods.find((item) => item.id === filters.payMethodId)
                      ?.name
                  }
                </span>
              )}
              {filters.startDate !== "" && filters.endDate !== "" && (
                <span className="inline-flex items-center rounded-full bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-800">
                  기간: {filters.startDate} ~ {filters.endDate}
                </span>
              )}
            </p>
          </div>
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors"
          >
            <Filter className="mr-2 -ml-1 h-4 w-4" />
            필터 초기화
          </button>
        </div>
      </td>
    </tr>
  );
};
