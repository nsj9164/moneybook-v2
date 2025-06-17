import { useState } from "react";
import { FormMap } from "../types/GenericFormTypes";

export const useGenericFormPagination = () => {
  const [currentData, setCurrentData] = useState<FormMap[K] | undefined>();

  // data_pagination 적용
  const totalPages = Math.ceil(filteredData.length / 10);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * 10,
    currentPage * 10
  );

  const handlePageChange = (type: string) => {
    setCurrentPage((prev) =>
      type === "next" ? Math.max(prev + 1, totalPages) : Math.max(prev - 1, 1)
    );
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return {
    currentPage,
    filteredData,
    paginatedData,
    handlePageChange,
    goToPage,
    searchQuery,
    setSearchQuery,
  };
};
