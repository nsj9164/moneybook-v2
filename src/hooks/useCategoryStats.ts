import { categoryStatsState } from "@/recoil/atoms";
import { formatKeyCase } from "@/utils/caseConverter";
import { supabase } from "@/utils/supabase";
import { useRecoilState } from "recoil";
import { useEffect } from "react";

export const useCategoryStats = () => {
  const [stats, setStats] = useRecoilState(categoryStatsState);

  useEffect(() => {
    const categoryStats = async () => {
      const { data, error } = await supabase
        .from("category_expense_summary")
        .select(`id, name, color, emoji, budget, budget_yn, spent`);

      if (error) console.error("CategoryStats Error:", error.message);

      if (data) {
        const mappedData = formatKeyCase(data, "camel");
        setStats(mappedData ?? []);
      }
    };

    categoryStats();
  }, []);

  return stats;
};
