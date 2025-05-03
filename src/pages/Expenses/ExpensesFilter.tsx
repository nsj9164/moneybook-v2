import { Filter, Search } from "lucide-react";
import { useFetchCategories } from "@/hooks/useFetchCategories";
import { useFetchPayMethods } from "@/hooks/useFetchPayMethods";

export const ExpensesFilter = () => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative">
          <label
            htmlFor="search"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            검색
          </label>
          <div className="relative">
            <input
              type="text"
              id="search"
              placeholder="설명 검색..."
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm pl-10"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            카테고리
          </label>
          <select
            id="category"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
            defaultValue="전체"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="payment-method"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            결제 수단
          </label>
          <select
            id="payment-method"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
            defaultValue="전체"
          >
            {payMethods.map((method) => (
              <option key={method.id} value={method.id}>
                {method.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="date-range"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            기간
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="date"
              id="start-date"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
            />
            <span className="text-gray-500">~</span>
            <input
              type="date"
              id="end-date"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button
          type="button"
          className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          <Filter className="mr-2 -ml-1 h-4 w-4" />
          필터 초기화
        </button>
      </div>
    </div>
  );
};
