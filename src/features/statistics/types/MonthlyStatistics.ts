export interface MonthlyStatisticsResponse {
  categorySummary: { income: CategorySummary[]; expenses: CategorySummary[] };
  paymentMethods: PaymentMethodSummary[];
  weekdayCategoryAverage: WeekdaySummary[];
  weeklySummary: WeeklySummary[];
  recurringExpenses: RecurringExpensesSummary;
  topSpending: TopSpendingSummary;
  noSpendingDays: NoSpendingDaysSummary;
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
  currentRatio: number;
  previousAmount: number;
}

export interface WeekdaySummary {
  weekday: number;
  categories: {
    categoryId: number;
    category: string;
    average: number;
  }[];
}

export interface WeeklySummary {
  weekNumber: number;
  expense: number;
  expenseRatio: number;
  avgDaily: number;
}

export interface RecurringExpensesSummary {
  items: {
    id: number;
    name: string;
    category: string;
    amount: number;
  }[];
  totalAmount: number;
  expenseRatio: number;
}

export interface TopSpendingSummary {
  highestSpendingDay: {
    date: string;
    amount: number;
  };
  largestSingleExpense: {
    date: string;
    name: string;
    amount: number;
  };
}

export interface NoSpendingDaysSummary {
  yearToDate: number;
  currentMonth: number;
  previousMonth: number;
  curentMonthDays: number[];
}
