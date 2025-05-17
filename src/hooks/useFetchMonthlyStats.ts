import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";

interface MonthlyExpenseSummary {
  total_current_month: number;
  total_previous_month: number;
}

export const useFetchMonthlyStats = () => {
  const [stats, setStats] = useState<MonthlyExpenseSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStas = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .rpc<MonthlyExpenseSummary, void>("get_monthly_expense_summary")
        .single();

      if (error) {
        console.error("Fetch Monthly Stats Error:", error);
        return;
      }

      setStats(data);
      setLoading(false);
    };

    fetchStas();
  }, []);

  return { data, loading };
};
