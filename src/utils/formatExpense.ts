import { IExpense } from "@/types/expense-types";

export const formatExpense = (item: any): IExpense => ({
  id: item.id,
  date: item.date,
  itemName: item.item_name,
  amount: item.amount,
  actualAmount: item.actual_amount,
  note: item.note,
  paymentMethodId: item.payment_method_id,
  categoryId: item.category_id,
  isDifferentAmount: item.is_different_amount ?? false,
});
