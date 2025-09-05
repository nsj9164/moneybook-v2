import { TransactionInsertDTO, TransactionSaved } from "@/types";
import { Insert, Update } from "@/types/crud";
import { UUID } from "@/types/ids";
import {
  createDeleteHandler,
  createUpsertHandler,
} from "@/utils/createUpsertHandler";

interface useExpenseProps {
  userId: UUID;
  setTransactions: React.Dispatch<React.SetStateAction<TransactionSaved[]>>;
}

export const useExpenseHandlers = ({
  userId,
  setTransactions,
}: useExpenseProps) => {
  const { upsertMany } = createUpsertHandler<
    TransactionInsertDTO,
    TransactionSaved
  >("expenses", userId, setTransactions);

  const handleSaveExpense = async (
    data: (Insert<TransactionInsertDTO> | Update<TransactionSaved>)[]
  ) => {
    return await upsertMany(data);
  };

  const handleDeleteExpense = createDeleteHandler<TransactionSaved>("expenses");

  return { handleSaveExpense, handleDeleteExpense };
};
