import { ICategory } from "@/types/expense-types";
import { deleteItem } from "@/utils/crud";

export const deleteCateogy = async (id: number) => {
  await deleteItem("category", id);
};

export const saveCategory = async (
  category: ICategory,
  onSuccess: () => void
) => {
  await saveCategory("category", category, onSuccess);
};
