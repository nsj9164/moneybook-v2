import { useState } from "react";
import { Plus } from "lucide-react";
import { ICategory } from "@/types/expense-types";
import { matchHangul } from "@/utils/matchHangul";
import { CategoryModal } from "./CategoryModal";
import { CategoryTable } from "./table/Table";
import { CategoryPagination } from "./CategoryPagination";
import { useFetchCategories } from "@/hooks/useFetchCategories";
import { supabase } from "@/utils/supabase";

const ManageCategories = () => {
  const categories = useFetchCategories();
  console.log("#######", categories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<ICategory | undefined>(
    undefined
  );
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // categories_검색 적용
  const filteredCategories = categories.filter((category) =>
    matchHangul(searchQuery, category.name)
  );

  // categories_pagination 적용
  const totalPages = Math.ceil(filteredCategories.length / 10);
  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * 10,
    currentPage * 10
  );

  const handlePageChange = (type: string) => {
    setCurrentPage((prev) =>
      type === "next" ? Math.max(prev + 1, totalPages) : Math.max(prev - 1, 1)
    );
  };

  const handleAddCategory = () => {
    setCurrentCategory(undefined);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEditCategory = (category: ICategory) => {
    setCurrentCategory(category);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDeleteCategory = async (id: number) => {
    if (window.confirm("이 카테고리를 삭제하시겠습니까?")) {
      const { error } = await supabase.from("categories").delete().eq("id", id);

      if (error) {
        console.error("Delete error:", error.message);
        return;
      }
    }
  };

  const handleSaveCategory = async (category: ICategory) => {
    if (!isEditing) return;

    const { error } = await supabase
      .from("categories")
      .upsert(category)
      .select();

    if (error) {
      console.error("Insert error:", error.message);
      return;
    }

    setIsModalOpen(false);
  };

  return (
    <div className="bg-white h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-medium">카테고리 관리</h2>
        <button
          onClick={handleAddCategory}
          className="inline-flex items-center rounded-md bg-emerald-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          카테고리 추가
        </button>
      </div>

      <div className="p-4">
        <div className="mb-4">
          <label htmlFor="search" className="sr-only">
            카테고리 검색
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
              placeholder="카테고리 검색"
              type="search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
          <CategoryTable
            paginatedCategories={paginatedCategories}
            handleEditCategory={handleEditCategory}
            handleDeleteCategory={handleDeleteCategory}
          />
          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <CategoryPagination
              filteredLen={filteredCategories.length}
              handlePageChange={handlePageChange}
              currentPage={currentPage}
              totalPages={totalPages}
            />
          )}
        </div>
      </div>

      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCategory}
        category={currentCategory}
        isEditing={isEditing}
      />
    </div>
  );
};

// 카테고리 추가/수정 모달

export default ManageCategories;
