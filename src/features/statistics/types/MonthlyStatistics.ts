export interface MonthlyStatisticsResponse {
  noSpendingDays: {
    currentMonth: number;
    previousMonth: number;
    yearToDate: number;
    currentMonthDays: number[];
  };
  categorySummary: { income: CategorySummary[]; expenses: CategorySummary[] };
  paymentMethods: PaymentMethodSummary[];
  weekdayCategoryAverage: WeekdaySummary[];
}

export interface CategorySummary {
  categoryId: number;
  category: string;
  currentAmount: number;
  previousAmount: number;
}

export interface PaymentMethodSummary {
  methodId: number;
  method: string;
  currentAmount: number;
  previousAmount: number;
}

export interface WeekdaySummary {
  weekday: number;
  categories: { categoryId: number; category: string; average: number };
}
