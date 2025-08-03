import { CategorySaved } from "@/types";

interface RecurringFilterPanelProps {
  filters: { search: string; category: string; active: string };
  updateFilter: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  categories: CategorySaved[];
}
export const RecurringFilterPanel = ({
  filters,
  updateFilter,
  categories,
}: RecurringFilterPanelProps) => {
  return (
    <div className="mb-4 grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="md:col-span-2">
        <label htmlFor="search" className="sr-only">
          고정지출 검색
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <input
            id="search"
            name="search"
            className="block w-full rounded-md border-0 py-2 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm"
            placeholder="고정지출 검색"
            type="search"
            value={filters.search}
            onChange={(e) => updateFilter(e)}
          />
        </div>
      </div>

      <div>
        <label htmlFor="category" className="sr-only">
          카테고리 필터
        </label>
        <select
          id="category"
          name="category"
          className="block w-full rounded-md border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm"
          value={filters.category}
          onChange={(e) => updateFilter(e)}
        >
          <option value="">모든 카테고리</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="active" className="sr-only">
          상태 필터
        </label>
        <select
          id="active"
          name="active"
          className="block w-full rounded-md border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm"
          value={filters.active}
          onChange={(e) => updateFilter(e)}
        >
          <option value="">모든 상태</option>
          <option value="active">활성화</option>
          <option value="inactive">비활성화</option>
        </select>
      </div>
    </div>
  );
};
