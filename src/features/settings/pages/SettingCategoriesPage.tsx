import { useFetchCategories } from "@/hooks/fetchData/useFetchCategories";
import { useAuth } from "@/contexts/AuthContext";
import { useSetRecoilState } from "recoil";
import { categoriesState } from "@/recoil/atoms";
import GenericForm from "@/features/settings/components/common/form/GenericForm";
import { FormType } from "@/features/settings/types/GenericFormTypes";
import {
  createDeleteItemHandler,
  createUpsertHandler,
} from "@/utils/createUpsertHandler";
import { CategoryBase, CategorySaved } from "@/types";
import { TableHeader } from "../manageCategories/components/TableHeader";
import { TableRow } from "../manageCategories/components/TableRow";
import { ConfirmModal } from "@/components/common/modal/ConfirmModal";
import { useConfirmModal } from "@/hooks/useConfirmModal";

const ManageCategories = () => {
  const { userId } = useAuth();
  const categories = useFetchCategories();

  const setCategories = useSetRecoilState(categoriesState);

  const handleSaveCategory = createUpsertHandler<CategoryBase, CategorySaved>(
    "categories",
    userId!,
    setCategories
  );

  const handleDeleteCategory = createDeleteItemHandler<CategorySaved>(
    "categories",
    setCategories
  );

  const { isConfirm, openConfirm, closeConfirm, handleConfirm } =
    useConfirmModal<number>(handleDeleteCategory);

  return (
    <>
      <GenericForm<FormType.Categories>
        formType={FormType.Categories}
        fetchData={categories}
        headers={<TableHeader />}
        renderRow={(category, { openModal }) => (
          <TableRow
            key={category.id}
            category={category}
            openModal={openModal}
            openConfirm={openConfirm}
          />
        )}
        onSave={handleSaveCategory}
      />

      <ConfirmModal
        isOpen={isConfirm}
        onClose={closeConfirm}
        onConfirm={handleConfirm}
      />
    </>
  );
};

export default ManageCategories;
