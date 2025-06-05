import { useState } from "react";
import { matchHangul } from "@/utils/matchHangul";
import { GenericFormTable } from "../../common/table/GenericFormTable";
import { formFieldConfigs, formMeta } from "../constants/formConfigs";
import { FormMap, FormType } from "../types/GenericFormTypes";
import { GenericFormHeader } from "./GenericFormHeader";
import { usePagination } from "../utils/usePagination";
import { PaginationFooter } from "./pagination/PaginationFooter";
import { GenericFormModal } from "./Modal/GenericFormModal";
import { GenericFormModalFields } from "./Modal/GenericFormModalFields";
import { DefaultValues, FormProvider, useForm } from "react-hook-form";

type GenericFormHandler<T> = {
  onEdit: (row: T) => void;
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
  const initialData = formMeta[formType].initial() as DefaultValues<FormMap[K]>;
  const methods = useForm<FormMap[K]>({ defaultValues: initialData });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // data_검색 적용
  const filteredData = fetchData.filter((item) =>
    matchHangul(searchQuery, item.name)
  );

  // data_pagination 적용
  const { currentPage, totalPages, handlePageChange, startIndex, endIndex } =
    usePagination(filteredData.length);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * 10,
    currentPage * 10
  );

  const handleAddData = () => {
    methods.reset(initial());
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEditData = (data: FormMap[K]) => {
    methods.reset(data);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDeleteData = async (id: number) => {
    if (window.confirm("이 카테고리를 삭제하시겠습니까?")) {
      await onDelete(id);
    }
  };

  return (
    <div className="bg-white h-full">
      <GenericFormHeader title={title} handleAddData={handleAddData} />

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
                onEdit: handleEditData,
                onDelete: handleDeleteData,
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
          isOpen={isModalOpen}
          isEditing={isEditing}
          onClose={() => setIsModalOpen(false)}
          onSave={onSave}
        >
          <GenericFormModalFields
            formTitle={title}
            fieldConfigs={fieldConfigs}
          />
        </GenericFormModal>
      </FormProvider>
    </div>
  );
}

export default GenericForm;
