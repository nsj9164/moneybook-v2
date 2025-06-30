import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";

interface MonthlyExpenseSummary {
  monthlyExpense: number;
  lastMonthExpense: number;
}

export const useFetchMonthlyStats = () => {
  const [stats, setStats] = useState<MonthlyExpenseSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStas = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .rpc("get_monthly_expense_summary")
        .single<{
          total_current_month: number;
          total_previous_month: number;
        }>();

      if (error || !data) {
        console.error("Fetch Monthly Stats Error:", error);
        setStats({ monthlyExpense: 0, lastMonthExpense: 0 });
        setLoading(false);
        return;
      }

      const mappedStats: MonthlyExpenseSummary = {
        monthlyExpense: data.total_current_month ?? 0,
        lastMonthExpense: data.total_previous_month ?? 0,
      };

      setStats(mappedStats);
      setLoading(false);
    };

    fetchStas();
  }, []);

  return { stats, loading };
};
