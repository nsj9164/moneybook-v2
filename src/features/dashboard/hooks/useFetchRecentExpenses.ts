import { supabase } from "@/utils/supabase";
import { formatKeyCase } from "@/utils/caseConverter";
import { useEffect, useState } from "react";
import { startOfMonth } from "date-fns";
import { UUID } from "@/types/ids";

export const useFetchRecentExpenses = (
  targetDate: string,
  userId: UUID,
  limit = 5
) => {
  const [recentExpenses, setRecentExpenses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const start = startOfMonth(targetDate);

      const { data, error } = await supabase
        .from("expenses")
        .select(
          [
            "id",
            "date",
            "item_name",
            "amount",
            "transaction_type",
            "categories(name)",
          ].join(",")
        )
        .eq("user_id", userId)
        .gte("date", start.toISOString())
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
