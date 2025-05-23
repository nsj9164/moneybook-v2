import { Filter, Search } from "lucide-react";

export const ListNoFilteredData = ({
  resetFilters,
}: {
  resetFilters: () => void;
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center bg-gray-50 rounded-lg">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-3">
        <Search className="h-6 w-6 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-1">
        검색 결과가 없습니다
      </h3>
      <p className="text-sm text-gray-500 mb-3 max-w-md">
        현재 적용된 필터와 일치하는 지출 내역을 찾을 수 없습니다.
      </p>
      <button
        type="button"
        onClick={resetFilters}
        className="inline-flex items-center justify-center rounded-md border border-transparent bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors"
      >
        <Filter className="mr-2 -ml-1 h-4 w-4" />
        필터 초기화
      </button>
    </div>
  );
};
