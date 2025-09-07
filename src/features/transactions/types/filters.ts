export interface TransactionFiltersState {
  filterQuery: string;
  filterCategory: number;
  filterPayMethod: number;
  filterDifferentAmountOnly: boolean;
  filterRecurringOnly: boolean;
  startDate: string;
  endDate: string;
}

export type FilterKey = keyof TransactionFiltersState;

// 컬럼 정의
export const allColumns = [
  { id: "date", name: "날짜" },
  { id: "category", name: "카테고리" },
  { id: "itemName", name: "설명" },
  { id: "amount", name: "결제금액" },
  { id: "actualAmount", name: "실제지출" },
  { id: "paymentMethod", name: "결제수단" },
  { id: "note", name: "메모" },
];

export type FilterTab = "all" | "expense" | "income";

export interface QuickPeriodRange {
  selectedMonth: string;
  startDate: string;
  endDate: string;
}

export interface DateOptions {
  value: string;
  label: string;
}
