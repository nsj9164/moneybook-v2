import { UUID } from "@/types/ids";
import { formatKeyCase } from "@/utils/caseConverter";
import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";

interface DashboardSummaryProps {
  targetDate: Date;
  userId: UUID;
}

export const useFetchDashboardSummary = ({
  targetDate,
  userId,
}: DashboardSummaryProps) => {
  const [summaryData, setSummaryData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummaryData = async () => {
      setLoading(true);
      const { data, error } = await supabase.rpc("get_dashboard_summary", {
        input_target_date: targetDate,
        input_user_id: userId,
      });

      if (error || !data) console.log("Fetch Dashboard Summary Error:", error);

      if (data) {
        const mappedData = formatKeyCase(data, "camel");
        setSummaryData(mappedData ?? []);
      }
    };

    fetchSummaryData();
  }, []);

  const monthlyExpenseRate = summaryData.budget;

  const monthlyBudgetRate = monthly;

  return summaryData;
};
