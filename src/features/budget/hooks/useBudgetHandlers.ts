import { budgetState } from "@/recoil/atoms";
import { UUID } from "@/types/ids";
import { useSetRecoilState } from "recoil";
import {
  createDeleteItemHandler,
  createUpsertHandler,
} from "../../../utils/crudHandlers";
import { BudgetInsertDTO, BudgetUpdateDTO } from "../types/budget.dto";
import { BudgetSaved } from "../types/budget.entity";

interface useBudgetProps {
  userId: UUID;
  refetchAll: () => Promise<void>;
}

export const useBudgetHandlers = ({ userId, refetchAll }: useBudgetProps) => {
  const setBudget = useSetRecoilState(budgetState);

  const handleSaveBudget = async (
    budgetItems: (BudgetInsertDTO | BudgetUpdateDTO)[]
  ) => {
    const upsert = createUpsertHandler<BudgetInsertDTO, BudgetSaved>(
      "budgets",
      userId!,
      setBudget
    );

    for (const item of budgetItems) {
      if ("id" in item && typeof item.id === "string") {
        const { id: _tempId, ...draft } = item;
        console.log("draft::", draft);
        await upsert(draft);
      } else {
        await upsert(item);
      }
    }

    await refetchAll();
  };

  const handleDeleteBudget = createDeleteItemHandler<BudgetSaved>(
    "budgets",
    setBudget
  );

  return { handleSaveBudget, handleDeleteBudget };
};
