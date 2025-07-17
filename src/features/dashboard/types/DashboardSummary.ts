export interface ChartSummary {
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
