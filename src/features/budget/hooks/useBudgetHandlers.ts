import { deleteItem } from "@/api/supabase/deleteItem";
import { insertItem } from "@/api/supabase/insertItem";
import { updateItem } from "@/api/supabase/updateItem";
import { budgetState } from "@/recoil/atoms";
import { BudgetEntity } from "@/types";
import { UUID } from "@/types/ids";
import { patchItem } from "@/utils/patchItem";
import { useSetRecoilState } from "recoil";

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

  const handleSaveBudget = async (budgetItems: BudgetEntity[]) => {
    for (const item of budgetItems) {
      const isNew = typeof item.id === "string";

      const commonFields = {
        ...item,
        year: selectedDate.year,
        month: selectedDate.month,
      };

      if (isNew) {
        const saved = await insertItem("budgets", commonFields, userId!);
        setBudget((prev) => patchItem(prev, saved));
      } else {
        const updateFields = { ...commonFields, id: item.budgetId };
        delete updateFields.budgetId;

        const saved = await updateItem("budgets", updateFields, userId!);
        setBudget((prev) => patchItem(prev, saved));
      }
    }

    await refetchAll();
  };

  const handleDelBudget = async (id: number) => {
    await deleteItem("budgets", id);
    setBudget((prev) => prev.filter((item) => item.id !== id));
    await refetchAll();
  };

  return { handleSaveBudget, handleDelBudget };
};
