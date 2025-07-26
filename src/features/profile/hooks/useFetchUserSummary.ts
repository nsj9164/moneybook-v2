import { UUID } from "@/types/ids";
import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";

export const useFetchUserSummary = ({ userId }: { userId: UUID }) => {
  const [summary, setSummary] = useState({
    totalExpenseCount: 0,
    totalExpenseAmount: 0,
    averageMonthlyExpense: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("expenses")
        .select("amount, date")
        .eq("user_id", userId)
        .eq("transaction_type", 2);

      if (error || !data) {
        console.error("Fetch Total Expense Summary Error:", error.message);
        return;
      }

      const totalExpenseCount = data.length;
      const totalExpenseAmount = data.reduce((sum, cur) => sum + cur.amount, 0);

      const uniqueMonths = new Set(
        data.map((item) => new Date(item.date).toISOString().slice(0, 7))
      );
      const averageMonthlyExpense =
        totalExpenseCount > 0
          ? Math.round(totalExpenseAmount / uniqueMonths.size)
          : 0;

      setSummary({
        totalExpenseCount,
        totalExpenseAmount,
        averageMonthlyExpense,
      });
    };

    if (userId) fetchData();
  }, [userId]);

  return summary;
};
