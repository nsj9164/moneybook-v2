import { ExpenseInsertDTO, ExpenseSaved } from "@/types";
import { UUID } from "@/types/ids";
import {
  createDeleteHandler,
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
  const { upsertMany } = createUpsertHandler<ExpenseInsertDTO, ExpenseSaved>(
    "expenses",
    userId,
    setExpenses
  );

  const handleSaveExpense = async (
    data: (ExpenseInsertDTO | Partial<ExpenseSaved>)[]
  ) => {
    return await upsertMany(data);
  };

  const handleDeleteExpense = createDeleteHandler<ExpenseSaved>("expenses");

  return { handleSaveExpense, handleDeleteExpense };
};
