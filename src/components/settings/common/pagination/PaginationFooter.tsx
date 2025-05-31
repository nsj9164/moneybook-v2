import { PaginationNav } from "./PaginationNav";

interface paginationProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
  startIndex: number;
  endIndex: number;
}

export const PaginationFooter = ({
  currentPage,
  totalPages,
  handlePageChange,
  startIndex,
  endIndex,
}: paginationProps) => {
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            전체 <span className="font-medium">{totalPages}</span> 항목 중{" "}
            <span className="font-medium">{startIndex}</span>-
            <span className="font-medium">{endIndex}</span>
          </p>
        </div>
        <div>
          <PaginationNav
            handlePageChange={handlePageChange}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </div>
      </div>
    </div>
  );
};
