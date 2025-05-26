import { IPayMethod } from "@/types/expense-types";
import { deleteItem, saveItem } from "@/utils/crud";

export const deletePayMethod = async (id: number) => {
  await deleteItem("payment_methods", id);
};

export const savePayMethod = async (
  payMethod: IPayMethod,
  onSuccess: () => void
) => {
  await saveItem("payment_methods", payMethod, onSuccess);
};
