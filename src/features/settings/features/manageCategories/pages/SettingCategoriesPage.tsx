import { useFetchCategories } from "@/hooks/fetchData/useFetchCategories";
import { useAuth } from "@/contexts/AuthContext";
import { useSetRecoilState } from "recoil";
import { categoriesState } from "@/recoil/atoms";
import { TableRow } from "../components/TableRow";
import { TableHeader } from "../components/TableHeader";
import GenericForm from "@/features/settings/components/common/form/GenericForm";
import { FormType } from "@/features/settings/types/GenericFormTypes";
import {
  createDeleteItemHandler,
  createUpsertHandler,
} from "@/utils/crudHandlers";
import { CategoryDraft, CategorySaved } from "@/types";

const ManageCategories = () => {
  const { userId } = useAuth();
  const categories = useFetchCategories();
  const setCategories = useSetRecoilState(categoriesState);

  const handleSaveCategory = createUpsertHandler<CategoryDraft>(
    "categories",
    userId!,
    setCategories
  );

  const handleDeleteCategory = createDeleteItemHandler<CategorySaved>(
    "categories",
    setCategories
  );

  return (
    <GenericForm<FormType.Categories>
      formType={FormType.Categories}
      fetchData={categories}
      headers={<TableHeader />}
      renderRow={(category, { openModal, onDelete }) => (
        <TableRow
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
