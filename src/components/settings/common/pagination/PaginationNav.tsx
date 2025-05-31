import { ChevronLeft, ChevronRight } from "lucide-react";

interface paginationProps {
  handlePageChange: (page: number) => void;
  currentPage: number;
  totalPages: number;
}

export const PaginationNav = ({
  handlePageChange,
  currentPage,
  totalPages,
}: paginationProps) => {
  return (
    <nav
      className="isolate inline-flex -space-x-px rounded-md shadow-sm"
      aria-label="Pagination"
    >
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
          currentPage === 1 ? "cursor-not-allowed" : ""
        }`}
      >
        <span className="sr-only">이전</span>
        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
      </button>
      {Array.from({ length: totalPages }).map((_, i) => (
        <button
          key={i}
          onClick={() => handlePageChange(i + 1)}
          className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
            currentPage === i + 1
              ? "z-10 bg-emerald-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
              : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          }`}
        >
          {i + 1}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
          currentPage === totalPages ? "cursor-not-allowed" : ""
        }`}
      >
        <span className="sr-only">다음</span>
        <ChevronRight className="h-5 w-5" aria-hidden="true" />
      </button>
    </nav>
  );
};
