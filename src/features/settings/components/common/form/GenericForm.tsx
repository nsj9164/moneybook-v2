import { useState, useMemo } from "react";
import { matchHangul } from "@/utils/matchHangul";
import { GenericFormHeader } from "./GenericFormHeader";
import { DefaultValues, FormProvider } from "react-hook-form";
import { GenericFormTable } from "@/components/common/table/GenericFormTable";
import { FormMap, FormType } from "@/features/settings/types/GenericFormTypes";
import {
  formFieldConfigs,
  formMeta,
} from "@/features/settings/constants/formConfigs";
import { useModalForm } from "@/hooks/useModalForm";
import { usePagination } from "@/features/settings/utils/usePagination";
import { PaginationFooter } from "../pagination/PaginationFooter";
import { GenericFormModal } from "../modal/GenericFormModal";
import { GenericFormModalFields } from "../modal/GenericFormModalFields";
import { ConfirmModal } from "@/components/common/modal/ConfirmModal";
import toast from "react-hot-toast";

type GenericFormHandler<T> = {
  openModal: (row?: T) => void;
  onDelete: (id: number) => void;
};

interface GenericFormProps<K extends FormType> {
  formType: K;
  headers: React.ReactNode;
  fetchData: FormMap[K][];
  renderRow: (
    row: FormMap[K],
    handler: GenericFormHandler<FormMap[K]>
  ) => React.ReactNode;
  onDelete: GenericFormHandler<FormMap[K]>["onDelete"];
  onSave: (row: Partial<FormMap[K]>) => void;
}

function GenericForm<K extends FormType>({
  formType,
  headers,
  fetchData,
  renderRow,
  onDelete,
  onSave,
}: GenericFormProps<K>) {
  const { title, initial } = formMeta[formType];
  const fieldConfigs = formFieldConfigs[formType];

  const defaultValues = useMemo(
    () => initial() as DefaultValues<FormMap[K]>,
    [formType]
  );
  const { methods, isOpen, isEditing, openModal, closeModal } =
    useModalForm<FormMap[K]>(defaultValues);

  const [isDelete, setIsDelete] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // 모달 열기/닫기
  const toggleModal = (type: boolean) => setIsDelete(type);

  // data_검색 적용
  const filteredData = fetchData.filter((item) =>
    matchHangul(searchQuery, item.name)
  );

  // data_pagination 적용
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
    toggleModal(true);
  };

  const handleDeleteData = async () => {
    if (deleteId === null) return;

    try {
      await onDelete(deleteId);
      toast.success("삭제가 완료됐어요.");
      setDeleteId(null);
      toggleModal(false);
    } catch {
      toast.error("항목 삭제에 실패했어요. 잠시 후 다시 시도해주세요.");
    }
  };

  return (
    <div className="bg-white h-full">
      <GenericFormHeader title={title} openModal={openModal} />

      <div className="p-4">
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
              name="search"
              placeholder={`${title} 검색`}
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

        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
          <GenericFormTable
            headers={headers}
            rows={paginatedData}
            renderRow={(row) =>
              renderRow(row, {
                openModal: openModal,
                onDelete: showConfirmDelete,
              })
            }
          />
          {/* 페이지네이션 */}
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
          <GenericFormModalFields
            formTitle={title}
            fieldConfigs={fieldConfigs}
          />
        </GenericFormModal>
      </FormProvider>

      <ConfirmModal
        isOpen={isDelete}
        onClose={toggleModal}
        onConfirm={handleDeleteData}
      />
    </div>
  );
}

export default GenericForm;
