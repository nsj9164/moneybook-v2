import { useState } from "react";

export const usePagination = (totalItems: number, pageSize: number = 10) => {
  const [currentPage, setCurrentPage] = useState(1);

  // data_pagination 적용
  const totalPages = Math.ceil(totalItems / pageSize);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, totalItems);

  return {
    currentPage,
    totalPages,
    handlePageChange,
    startIndex,
    endIndex,
  };
};
