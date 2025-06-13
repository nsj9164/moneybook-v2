import { useAuth } from "@/contexts/AuthContext";
import { formatKeyCase } from "@/utils/caseConverter";
import { supabase } from "@/utils/supabase";
import { useCallback, useEffect, useState } from "react";

interface BudgetCategoriesOptions {
  selectedDate: { year: number; month: number };
}

export const useUnBudgetedCategories = ({
  selectedDate,
}: BudgetCategoriesOptions) => {
  const { userId } = useAuth();
  const [unBudgets, setUnBudgets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUnbudgeted = useCallback(async () => {
    if (!userId) return;

    setLoading(true);
    const { data, error } = await supabase.rpc(
      "get_unbudgeted_categories_by_date",
      {
        input_user_id: userId,
        input_year: selectedDate.year,
        input_month: selectedDate.month,
      }
    );

    if (error) {
      console.error("fetch error:", error.message);
      setUnBudgets([]);
    } else {
      setUnBudgets(formatKeyCase(data, "camel"));
    }

    setLoading(false);
  }, [selectedDate, userId]);

  useEffect(() => {
    fetchUnbudgeted();
  }, [fetchUnbudgeted]);

  return { unBudgets, loading, refetch: fetchUnbudgeted };
};
