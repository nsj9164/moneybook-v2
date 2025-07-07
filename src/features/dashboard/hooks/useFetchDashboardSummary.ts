import { UUID } from "@/types/ids";
import { formatKeyCase } from "@/utils/caseConverter";
import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";
import { DashboardSummary } from "../types/DashboardSummary";

interface DashboardSummaryProps {
  targetDate: string;
  userId: UUID;
}

export const useFetchDashboardSummary = ({
  targetDate,
  userId,
}: DashboardSummaryProps) => {
  console.log("??????????????", targetDate, userId);
  const [summaryData, setSummaryData] = useState<DashboardSummary | null>(null);
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
      setLoading(false);
    };

    fetchSummaryData();
  }, [targetDate, userId]);
  console.log("..........", summaryData);
  const expense = summaryData?.thisMonth.expense ?? 0;
  const lastExpense = summaryData?.lastMonth.expense ?? 0;
  const income = summaryData?.thisMonth.income ?? 0;
  const lastIncome = summaryData?.lastMonth.income ?? 0;
  const budget = summaryData?.budget.goal ?? 0;
  const saving = summaryData?.thisMonth.saving ?? 0;

  const monthlyExpenseRate =
    lastExpense > 0 ? ((expense - lastExpense) / lastExpense) * 100 : 0;
  const isExpenseIncrease = expense > lastExpense;

  const monthlyIncomeRate =
    lastIncome > 0 ? ((income - lastIncome) / lastIncome) * 100 : 0;
  const isIncomeIncrease = income > lastIncome;

  const savingRate = income > 0 ? (saving / income) * 100 : 0;

  const budgetRate = budget > 0 ? (expense / budget) * 100 : 0;

  return {
    loading,
    lastExpense,
    lastIncome,

    expenseSummary: {
      expense,
      monthlyExpenseRate,
      isExpenseIncrease,
    },

    incomeSummary: {
      income,
      monthlyIncomeRate,
      isIncomeIncrease,
    },

    savingSummary: {
      saving,
      savingRate,
    },

    budgetSummary: {
      budget,
      budgetRate,
    },

    trendSummary: {
      topCategories: summaryData?.topCategories ?? [],
      lastSixMonths: summaryData?.lastSixMonths ?? [],
    },
  };
};
