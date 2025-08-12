import { deleteItem } from "@/api/supabase/deleteItem";
import { insertItem } from "@/api/supabase/insertItem";
import { updateItem } from "@/api/supabase/updateItem";
import { budgetState } from "@/recoil/atoms";
import { BudgetBase, BudgetSaved } from "@/types";
import { UUID } from "@/types/ids";
import { patchItem } from "@/utils/patchItem";
import { useSetRecoilState } from "recoil";
import {
  createDeleteItemHandler,
  createUpsertHandler,
} from "../../../utils/crudHandlers";

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

  const handleSaveBudget = createUpsertHandler<BudgetBase, BudgetSaved>(
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
