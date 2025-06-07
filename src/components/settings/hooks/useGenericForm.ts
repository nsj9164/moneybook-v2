import { matchHangul } from "@/utils/matchHangul";
import { useMemo, useState } from "react";

export function useGenericForm<T>(
  data: T[],
  match: (query: string, item: T) => boolean
) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // data_검색 적용
  const filteredData = useMemo(
    () => data.filter((d) => match(searchQuery, d)),
    [searchQuery, data]
  );
  //   data.filter((d) =>
  //     matchHangul(searchQuery, d.name)
  //   );

  // data_pagination 적용
  const totalPages = Math.ceil(filteredData.length / 10);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * 10,
    currentPage * 10
  );

  // const handlePageChange = (type: string) => {
  //   setCurrentPage((prev) =>
  //     type === "next" ? Math.max(prev + 1, totalPages) : Math.max(prev - 1, 1)
  //   );
  // };

  // const goToPage = (page: number) => {
  //   setCurrentPage(page);
  // };

  return {
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    totalPages,
    filteredData,
    paginatedData,
  };
}
