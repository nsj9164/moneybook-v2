import {
  ExpenseEntity,
  ExpenseInsertDTO,
  ExpenseSaved,
  ExpenseUpdateDTO,
} from "@/types";
import { UUID } from "@/types/ids";
import { createBatchUpsertHandler } from "@/utils/createBatchUpsertHandler";
import {
  createDeleteItemHandler,
  createUpsertHandler,
} from "@/utils/createUpsertHandler";

interface useExpenseProps {
  userId: UUID;
  setExpenses: React.Dispatch<React.SetStateAction<ExpenseSaved[]>>;
}

export const useExpenseHandlers = ({
  userId,
  setExpenses,
}: useExpenseProps) => {
  const handleSaveExpense = createBatchUpsertHandler<
    ExpenseEntity,
    ExpenseSaved
  >("expenses", userId, setExpenses);

  const handleDeleteExpense = createDeleteItemHandler<ExpenseSaved>("expenses");

  return { handleSaveExpense, handleDeleteExpense };
};
