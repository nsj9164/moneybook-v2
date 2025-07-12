export interface MonthlyStatisticsResponse {
  noSpendingDays: {
    currentMonth: number;
    previousMonth: number;
    yearToDate: number;
  };
  categorySummary: { income: CategorySummary[]; expenses: CategorySummary[] };
  paymentMethods: PaymentMethodSummary[];
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
