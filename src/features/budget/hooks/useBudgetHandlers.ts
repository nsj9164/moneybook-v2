import { budgetState } from "@/recoil/atoms";
import { UUID } from "@/types/ids";
import { useSetRecoilState } from "recoil";
import {
  createDeleteItemHandler,
  createUpsertHandler,
} from "../../../utils/crudHandlers";
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

  const handleSaveBudget = createUpsertHandler<BudgetDraft, BudgetSaved>(
    "budget",
    userId!,
    setBudget
  );

  const handleDeleteBudget = createDeleteItemHandler<BudgetSaved>(
    "budget",
    setBudget
  );

  return { handleSaveBudget, handleDeleteBudget };
};
