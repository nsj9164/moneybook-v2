import { CategorySummary } from "./MonthlyStatistics";

export interface MonthlyStatsProps {
  categorySummary: {
    income: CategorySummary[];
    expense: CategorySummary[];
  };
}
