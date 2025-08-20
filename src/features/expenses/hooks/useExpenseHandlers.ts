import { ExpenseEntity, ExpenseSaved } from "@/types";
import { UUID } from "@/types/ids";
import {
  createDeleteItemHandler,
  createUpsertHandler,
} from "@/utils/crudHandlers";

interface useExpenseProps {
  userId: UUID;
  setExpenses: React.Dispatch<React.SetStateAction<ExpenseSaved[]>>;
}

export const useExpenseHandlers = ({
  userId,
  setExpenses,
}: useExpenseProps) => {
  const handleSaveExpense = createUpsertHandler<ExpenseEntity, ExpenseSaved>(
    "expenses",
    userId!,
    setExpenses
  );

  const handleDeleteExpense = createDeleteItemHandler<ExpenseSaved>("expenses");

  return { handleSaveExpense, handleDeleteExpense };
};
