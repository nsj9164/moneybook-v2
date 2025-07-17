import { UUID } from "@/types/ids";
import { formatKeyCase } from "@/utils/caseConverter";
import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";
import { DashboardSummary } from "../types/DashboardSummary";

interface DashboardSummaryProps {
  targetDate: string;
  userId: UUID;
}

export const useFetchChartData = ({
  targetDate,
  userId,
}: DashboardSummaryProps) => {
  const [chartData, setChartData] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummaryData = async () => {
      setLoading(true);
      const { data, error } = await supabase.rpc("get_dashboard_chart_data", {
        input_target_date: targetDate,
        input_user_id: userId,
      });

      if (error || !data) {
        console.log("Fetch Dashboard Summary Error:", error);
        setChartData(null);
        setLoading(false);
        return;
      }

      const mappedData = formatKeyCase(data, "camel");
      setChartData(mappedData ?? null);
      setLoading(false);
    };

    fetchSummaryData();
  }, [targetDate, userId]);

  return chartData;
};
