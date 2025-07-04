import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/utils/supabase";
import { formatKeyCase } from "@/utils/caseConverter";
import { useEffect, useState } from "react";

export const useFetchRecentExpenses = (targetDate: Date, limit = 5) => {
  const [recentExpenses, setRecentExpenses] = useState([]);
  const { userId } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      const startOfMonth = new Date(
        targetDate.getFullYear(),
        targetDate.getMonth(),
        1
      );

      const { data, error } = await supabase
        .from("expenses")
        .select(
          [
            "id",
            "date",
            "item_name",
            "amount",
            "actual_amount",
            "note",
            "category_id",
            "payment_method_id",
            "categories(name, color)",
            "payment_methods(name)",
          ].join(",")
        )
        .eq("user_id", userId)
        .gte("date", startOfMonth.toISOString())
        .order("date", { ascending: false })
        .limit(limit);

      if (error) {
        console.error("Fetch Recent Expenses Error:", error.message);
        setRecentExpenses([]);
        return;
      }

      setRecentExpenses(formatKeyCase(data, "camel") ?? []);
    };

    if (userId) fetchData();
  }, [targetDate, userId, limit]);

  return recentExpenses;
};
