import { useState, ReactNode } from "react";
import { Plus } from "lucide-react";
import { matchHangul } from "@/utils/matchHangul";
import { GenericFormPagination } from "./GenericFormPagination";
import { GenericFormTable } from "@/components/common/table/GenericFormTable";
import { GenericFormModal } from "./GenericFormModal";
import { formFieldOptions, formMeta } from "../constants/formConfigs";
import { FormMap, FormType } from "../types/GenericFormTypes";
import { useGenericForm } from "../hooks/useGenericForm";

interface GenericFormProps<T> {
  data: T[];
  title: string;
  match: (query: string, item: T) => boolean;
  renderRow: (item: T) => React.ReactNode;
  renderModal: (props: {
    isOpen: boolean;
    onClose: () => void;
    data?: T;
    isEditing: boolean;
    onSave: (partial: Partial<T>) => void;
  }) => React.ReactNode;
  onDelete: (id: number) => void;
  onSave: (partial: Partial<T>) => void;
  initial: () => T;
}

function GenericForm<T extends { id: number }>({
  data,
  title,
  match,
  renderRow,
  renderModal,
  onDelete,
  onSave,
  initial,
}: GenericFormProps<T>) {
  const {
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedData,
    filteredData,
  } = useGenericForm<T>(data, match);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingData, setEditingData] = useState<T | undefined>(undefined);
  const isEditing = !!editingData;

  const handleEdit = (item: T) => {
    setEditingData(item);
    setModalOpen(true);
  };

  const handleAdd = () => {
    setEditingData(initial());
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      onDelete(id);
    }
  };

  const handleSave = (partial: Partial<T>) => {
    onSave(partial);
    setModalOpen(false);
  };

  return (
    <div className="bg-white">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-medium">{title} 관리</h2>
        <button
          onClick={handleAdd}
          className="bg-emerald-600 text-white rounded px-3 py-2"
        >
          + {title} 추가
        </button>
      </div>

      <div className="p-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={`${title} 검색`}
          className="w-full mb-4 p-2 border"
        />

        <table className="w-full">
          <thead>{/* your headers */}</thead>
          <tbody>{paginatedData.map((d) => renderRow(d))}</tbody>
        </table>

        <div className="flex justify-center gap-1 mt-4">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-2 py-1 ${
                currentPage === i + 1 ? "bg-emerald-600 text-white" : "border"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {renderModal({
        isOpen: modalOpen,
        onClose: () => setModalOpen(false),
        data: editingData,
        isEditing,
        onSave: handleSave,
      })}
    </div>
  );
}

export default GenericForm;
