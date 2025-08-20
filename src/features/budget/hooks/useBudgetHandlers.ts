import { UUID } from "@/types/ids";
import {
  createDeleteItemHandler,
  createUpsertHandler,
} from "../../../utils/crudHandlers";
import { BudgetInsertDTO, BudgetUpdateDTO, BudgetSaved } from "../types";

interface useBudgetProps {
  userId: UUID;
  refetchAll: () => Promise<void>;
}

export const useBudgetHandlers = ({ userId, refetchAll }: useBudgetProps) => {
  const handleSaveBudget = async (
    budgetItems: (BudgetInsertDTO | BudgetUpdateDTO)[]
  ) => {
    const upsert = createUpsertHandler<BudgetInsertDTO, BudgetSaved>(
      "budgets",
      userId!
    );

    for (const item of budgetItems) {
      if ("id" in item && typeof item.id === "string") {
        const { id: _tempId, ...draft } = item;
        await upsert(draft);
      } else {
        await upsert(item);
      }
    }

    await refetchAll();
  };

  const handleDeleteBudget = createDeleteItemHandler<BudgetSaved>("budgets");

  return { handleSaveBudget, handleDeleteBudget };
};
