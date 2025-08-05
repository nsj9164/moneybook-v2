interface SearchInputProps {
  title: string;
  searchQuery: string;
  handleSearchQuery: (searchQuery: string) => void;
  handlePageChange: (page: number) => void;
}

export const SearchInput = ({
  title,
  searchQuery,
  handleSearchQuery,
  handlePageChange,
}: SearchInputProps) => {
  return (
    <div className="mb-4">
      <label htmlFor="search" className="sr-only">
        {title} 검색
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
          placeholder={`{title} 검색`}
          type="search"
          value={searchQuery}
          onChange={(e) => {
            handleSearchQuery(e.target.value);
            handlePageChange(1);
          }}
          className="block w-full rounded-md border-0 py-2 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm"
        />
      </div>
    </div>
  );
};
