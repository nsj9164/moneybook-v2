import { CategorySummary } from "./MonthlyStatisticsType";

export interface MonthlyStatsProps {
  categorySummary: {
    income: CategorySummary[];
    expense: CategorySummary[];
  };
}
