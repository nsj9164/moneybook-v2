import { useState, ReactNode } from "react";
import { matchHangul } from "@/utils/matchHangul";
import { GenericFormTable } from "../../common/table/GenericFormTable";
import { formFieldOptions, formMeta } from "../constants/formConfigs";
import { FormMap, FormType } from "../types/GenericFormTypes";
import { GenericFormHeader } from "./GenericFormHeader";
import { usePagination } from "../utils/usePagination";
import { PaginationFooter } from "./pagination/\bPaginationFooter";
import { GenericFormModal } from "./Modal/GenericFormModal";

type GenericFormHandler<T> = {
  onEdit: (row: T) => void;
  onDelete: (id: number) => void;
};

interface GenericFormProps<T> {
  headers: ReactNode;
  fetchData: T[];
  renderRow: (row: T, handler: GenericFormHandler<T>) => ReactNode;
  onDelete: GenericFormHandler<T>["onDelete"];
  onSave: (row: Partial<T>) => void;
}

function GenericForm<K extends FormType>({
  formType,
  headers,
  fetchData,
  renderRow,
  onDelete,
  onSave,
}: GenericFormProps<FormMap[K]> & { formType: K }) {
  const { title, initial } = formMeta[formType];
  console.log("#######", fetchData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentData, setCurrentData] = useState<FormMap[K] | undefined>();
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // data_검색 적용
  const filteredData = fetchData.filter((data) =>
    matchHangul(searchQuery, data.name)
  );

  const { currentPage, totalPages, handlePageChange, startIndex, endIndex } =
    usePagination(filteredData.length);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * 10,
    currentPage * 10
  );

  const handleAddData = () => {
    setCurrentData(initial());
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEditData = (data: FormMap[K]) => {
    setCurrentData(data);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDeleteData = async (id: number) => {
    if (window.confirm("이 카테고리를 삭제하시겠습니까?")) {
      await onDelete(id);
    }
  };

  const handleSaveData = async (data: Partial<FormMap[K]>) => {
    await onSave(data);
    setIsModalOpen(false);
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

      <GenericFormModal
        formTitle={title}
        formData={currentData ?? initial()}
        fieldOptions={formFieldOptions[formType]}
        isOpen={isModalOpen}
        isEditing={isEditing}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveData}
      />
    </div>
  );
}

export default GenericForm;
