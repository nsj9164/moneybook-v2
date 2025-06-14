import { budgetState } from "@/recoil/atoms";
import { formatKeyCase } from "@/utils/caseConverter";
import { supabase } from "@/utils/supabase";
import { useRecoilState } from "recoil";
import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { BudgetEntity } from "@/types";

interface BudgetCategoriesOptions {
  selectedDate: { year: number; month: number };
}

export const useBudgetCategories = ({
  selectedDate,
}: BudgetCategoriesOptions) => {
  const { userId } = useAuth();
  const [budgets, setBudgets] = useRecoilState(budgetState);
  const [loading, setLoading] = useState(true);

  const fetchBudgetCategories = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.rpc("get_budget_summary_by_date", {
      input_user_id: userId,
      input_year: selectedDate.year,
      input_month: selectedDate.month,
    });

    if (error) {
      console.error("fetch error: ", error.message);
      setLoading(false);
      return;
    }

    if (data) {
      const camelData = formatKeyCase(data, "camel").map(
        (item: BudgetEntity) => ({
          ...item,
          id: item.budgetId,
        })
      );

      setBudgets(camelData);
    }
    setLoading(false);
  }, [selectedDate, userId, setBudgets]);

  useEffect(() => {
    fetchBudgetCategories();
  }, [fetchBudgetCategories]);

  return { budgets, loading, refetch: fetchBudgetCategories };
};
