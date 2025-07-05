export interface DashboardSummary {
  budget: {
    goal: number;
    used: number;
  };
  thisMonth: {
    income: number;
    expense: number;
    saving: number;
    budgetUsed: number;
  };
  lastMonth: {
    income: number;
    expense: number;
  };
  lastSixMonths: LastSixMonth[];
  topCategories: TopCategory[];
}

export interface TopCategory {
  category: string;
  color: string;
  amount: number;
  percent: number;
}

export interface LastSixMonth {
  month: string;
  total: number;
}
