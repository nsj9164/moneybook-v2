import { UUID } from "@/types/ids";
import { formatKeyCase } from "@/utils/caseConverter";
import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";
import { MonthlyStatisticsResponse } from "../../types/MonthlyStatistics";

interface MonthlyStatisticsProps {
  targetDate: string;
  userId: UUID;
}

export const useFetchMonthlyStatistics = ({
  targetDate,
  userId,
}: MonthlyStatisticsProps) => {
  const [monthlyData, setMonthlyData] =
    useState<MonthlyStatisticsResponse | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMonthlyData = async () => {
      setLoading(true);
      const { data, error } = await supabase.rpc("get_monthly_statistics", {
        input_target_date: targetDate,
        input_user_id: userId,
      });

      if (error || !data) {
        setMonthlyData(null);
        setLoading(false);
        return;
      }

      const mappedData = formatKeyCase(data, "camel");
      setMonthlyData(mappedData ?? null);
      setLoading(false);
    };

    fetchMonthlyData();
  }, [targetDate, userId]);

  return monthlyData;
};
