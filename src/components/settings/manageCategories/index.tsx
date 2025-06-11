import { useFetchCategories } from "@/hooks/useFetchCategories";
import { useAuth } from "@/contexts/AuthContext";
import { deleteItem, insertItem, updateItem } from "@/utils/crud";
import { useSetRecoilState } from "recoil";
import { categoriesState } from "@/recoil/atoms";
import { patchOrAddItem } from "@/utils/patchOrAddItem";
import { TableRow } from "./table/TableRow";
import { TableHeader } from "./table/TableHeader";
import GenericForm from "../common/form/GenericForm";
import { FormType } from "../types/GenericFormTypes";
import { CategoryEntity, CategoryInput } from "@/types";

const ManageCategories = () => {
  const { userId } = useAuth();
  const categories = useFetchCategories();
  const setCategories = useSetRecoilState(categoriesState);

  const handleDeleteCategory = async (id: number) => {
    await deleteItem("categories", id, () => {
      setCategories((prev) => prev.filter((item) => item.id !== id));
    });
  };

  const handleSaveCategory = async (
    category: Partial<CategoryInput> | Partial<CategoryEntity>
  ) => {
    const isEditing = "id" in category && typeof category.id === "number";

    const saveFn = isEditing
      ? updateItem<CategoryEntity>
      : insertItem<CategoryInput>;
    await saveFn("categories", category, userId!, (saved) => {
      if (!("id" in saved)) {
        throw new Error("id 데이터가 누락되었습니다.");
      }

      setCategories((prev) => patchOrAddItem(prev, saved));
    });
  };

  return (
    <GenericForm<FormType.Categories>
      formType={FormType.Categories}
      fetchData={categories}
      headers={<TableHeader />}
      renderRow={(category, { openModal, onDelete }) => (
        <TableRow
          key={category.id}
          category={category}
          openModal={openModal}
          onDelete={onDelete}
        />
      )}
      onDelete={handleDeleteCategory}
      onSave={handleSaveCategory}
    />
  );
};

export default ManageCategories;
