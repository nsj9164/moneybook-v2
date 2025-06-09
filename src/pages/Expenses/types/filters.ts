export interface ExpenseFiltersState {
  filterQuery: string;
  filterCategory: number;
  filterPayMethod: number;
  filterDifferentAmountOnly: boolean;
  filterRecurringOnly: boolean;
  filterStartDate: string;
  filterEndDate: string;
}

export type FilterKey = keyof ExpenseFiltersState;

export interface ExpenseColumns {
  id: string;
  name: string;
  visible: boolean;
}

// 컬럼 정의
export const allColumns = [
  { id: "date", name: "날짜", visible: true },
  { id: "category", name: "카테고리", visible: true },
  { id: "itemName", name: "설명", visible: true },
  { id: "amount", name: "결제금액", visible: true },
  { id: "actualAmount", name: "실제지출", visible: true },
  { id: "paymentMethod", name: "결제수단", visible: true },
  { id: "note", name: "메모", visible: true },
];
