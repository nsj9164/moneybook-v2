import { ICategory } from "@/types/expense-types";
import { useFetchCategories } from "@/hooks/useFetchCategories";
import { useAuth } from "@/contexts/AuthContext";
import { deleteItem, saveItem } from "@/utils/crud";
import { useSetRecoilState } from "recoil";
import { categoriesState } from "@/recoil/atoms";
import { patchOrAddItem } from "@/utils/patchOrAddItem";
import { TableRow } from "./table/TableRow";
import { TableHeader } from "./table/TableHeader";
import GenericForm from "../common/GenericForm";
import { FormType } from "../constants/types";

interface RenderRowProps {
  onEdit: (category: ICategory) => void;
  onDelete: (id: number) => void;
}

const ManageCategories = () => {
  const { userId } = useAuth();
  const categories = useFetchCategories();
  const setCategories = useSetRecoilState(categoriesState);

  const handleDeleteCategory = async (id: number) => {
    await deleteItem("categories", id, () => {
      setCategories((prev) => prev.filter((item) => item.id !== id));
    });
  };

  const handleSaveCategory = async (category: Partial<ICategory>) => {
    await saveItem("categories", category, userId!, (saved) => {
      setCategories((prev) => patchOrAddItem(prev, saved));
    });
  };
  return (
    <GenericForm<ICategory, FormType.Categories>
      formType={FormType.Categories}
      headers={<TableHeader />}
      fetchData={categories}
      renderRow={(category, { onEdit, onDelete }) => (
        <TableRow
          key={category.id}
          category={category}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
      onDelete={handleDeleteCategory}
      onSave={handleSaveCategory}
    />
  );
};

export default ManageCategories;
