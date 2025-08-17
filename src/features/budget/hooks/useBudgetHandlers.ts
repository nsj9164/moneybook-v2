import { budgetState } from "@/recoil/atoms";
import { UUID } from "@/types/ids";
import { useSetRecoilState } from "recoil";
import {
  createDeleteItemHandler,
  createUpsertHandler,
} from "../../../utils/crudHandlers";
import { BudgetInsertDTO, BudgetUpdateDTO } from "../types/budget.dto";
import { BudgetDraft, BudgetSaved } from "../types/budget.entity";

interface useBudgetProps {
  userId: UUID;
  selectedDate: { year: number; month: number };
  refetchAll: () => Promise<void>;
}

export const useBudgetHandlers = ({
  userId,
  selectedDate,
  refetchAll,
}: useBudgetProps) => {
  const setBudget = useSetRecoilState(budgetState);

  const handleSaveBudget = async (
    budgetItems: (BudgetInsertDTO | BudgetUpdateDTO)[]
  ) => {
    const upsert = createUpsertHandler<BudgetInsertDTO, BudgetSaved>(
      "budget",
      userId!,
      setBudget
    );

    for (const item of budgetItems) {
      if ("id" in item && typeof item.id === "string") {
        const { id: _tempId, ...draft } = item;
        await upsert(draft);
      } else {
        await upsert(item);
      }
    }
  };

  const handleDeleteBudget = createDeleteItemHandler<BudgetSaved>(
    "budget",
    setBudget
  );

  return { handleSaveBudget, handleDeleteBudget };
};
