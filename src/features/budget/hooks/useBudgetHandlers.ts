import { UUID } from "@/types/ids";
import {
  createDeleteHandler,
  createUpsertHandler,
} from "../../../utils/createUpsertHandler";
import { BudgetInsertDTO, BudgetUpdateDTO, BudgetSaved } from "../types";

interface useBudgetProps {
  userId: UUID;
  refetchAll: () => Promise<void>;
}

export const useBudgetHandlers = ({ userId, refetchAll }: useBudgetProps) => {
  const handleSaveBudget = async (
    data: (BudgetInsertDTO | BudgetUpdateDTO)[]
  ) => {
    const { upsertMany } = createUpsertHandler<BudgetInsertDTO, BudgetSaved>(
      "budgets",
      userId!
    );

    await upsertMany(data);
    await refetchAll();
  };

  const deleteBudget = createDeleteHandler<BudgetSaved>("budgets");

  const handleDeleteBudget = async (id: number) => {
    await deleteBudget(id);
    await refetchAll();
  };

  return { handleSaveBudget, handleDeleteBudget };
};
