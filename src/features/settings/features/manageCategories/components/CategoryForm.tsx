import { useState, useMemo } from "react";
import { matchHangul } from "@/utils/matchHangul";
import { FormProvider, DefaultValues } from "react-hook-form";
import { GenericFormTable } from "@/components/common/table/GenericFormTable";
import { useModalForm } from "@/hooks/useModalForm";
import { usePagination } from "@/features/settings/utils/usePagination";
import { ConfirmModal } from "@/components/common/modal/ConfirmModal";
import toast from "react-hot-toast";

import { categoryFormFieldConfigs } from "../constants/CategoryConstants";
import { CategoryDraft, CategorySaved } from "@/types";
import { GenericFormHeader } from "@/features/settings/components/common/form/GenericFormHeader";
import { PaginationFooter } from "@/features/settings/components/common/pagination/PaginationFooter";
import { GenericFormModal } from "@/features/settings/components/common/modal/GenericFormModal";

interface CategoryFormProps {
  categories: CategorySaved[];
  onSave: (row: Partial<CategoryDraft>) => void;
  onDelete: (id: number) => void;
  renderRow: (
    row: CategorySaved,
    handler: {
      openModal: (row?: CategorySaved) => void;
      onDelete: (id: number) => void;
    }
  ) => React.ReactNode;
}

export function CategoryForm({
  categories,
  onSave,
  onDelete,
  renderRow,
}: CategoryFormProps) {
  const title = "카테고리";
  const defaultValues = useMemo(
    () =>
      ({
        name: "",
        budget: 0,
        transactionType: 0,
        emoji: "💰",
        color: "#16a34a",
        defaultYn: false,
      } as DefaultValues<CategoryDraft>),
    []
  );

  const { methods, isOpen, isEditing, openModal, closeModal } =
    useModalForm<CategoryDraft>(defaultValues);

  const [isDelete, setIsDelete] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = categories.filter((item) =>
    matchHangul(searchQuery, item.name)
  );

  const {
    currentPage,
    totalPages,
    handlePageChange,
    goToLastPageIfNeeded,
    startIndex,
    endIndex,
  } = usePagination(filteredData.length);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * 10,
    currentPage * 10
  );

  const paginateAfterAdd = () => {
    const nextTotal = filteredData.length + 1;
    goToLastPageIfNeeded(nextTotal);
  };

  const showConfirmDelete = (id: number) => {
    setDeleteId(id);
    setIsDelete(true);
  };

  const handleDeleteData = async () => {
    if (deleteId === null) return;
    try {
      await onDelete(deleteId);
      toast.success("삭제가 완료됐어요.");
      setDeleteId(null);
      setIsDelete(false);
    } catch {
      toast.error("항목 삭제에 실패했어요. 잠시 후 다시 시도해주세요.");
    }
  };

  return (
    <div className="bg-white h-full">
      <GenericFormHeader title={title} openModal={openModal} />

      <div className="p-4">
        {/* 검색창 */}
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
              placeholder="카테고리 검색"
              type="search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                handlePageChange(1);
              }}
              className="block w-full rounded-md border-0 py-2 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm"
            />
          </div>
        </div>

        {/* 테이블 */}
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
          <GenericFormTable
            headers={headers}
            rows={paginatedData}
            renderRow={(row) =>
              renderRow(row, { openModal, onDelete: showConfirmDelete })
            }
          />
          {totalPages > 1 && (
            <PaginationFooter
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
              startIndex={startIndex}
              endIndex={endIndex}
            />
          )}
        </div>
      </div>

      <FormProvider {...methods}>
        <GenericFormModal
          formTitle={title}
          isOpen={isOpen}
          isEditing={isEditing}
          onClose={closeModal}
          onSave={onSave}
          paginateAfterAdd={paginateAfterAdd}
        >
          <CategoryModalFields
            formTitle="카테고리"
            fieldConfigs={categoryFormFieldConfigs}
          />
        </GenericFormModal>
      </FormProvider>

      <ConfirmModal
        isOpen={isDelete}
        onClose={setIsDelete}
        onConfirm={handleDeleteData}
      />
    </div>
  );
}
