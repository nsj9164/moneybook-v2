import { IExpense } from "@/types/expense-types";

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

export interface ExpenseFilterActions {
  handleFiltersChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  resetField: (e: React.MouseEvent<HTMLButtonElement>) => void;
  resetFilters: () => void;
}

export interface ExpenseFiltersReturn {
  filters: ExpenseFiltersState;
  filteredExpense?: IExpense[];
  handleFiltersChange?: ExpenseFilterActions["handleFiltersChange"];
  resetField?: ExpenseFilterActions["resetField"];
  resetFilters?: ExpenseFilterActions["resetFilters"];
}

export interface ExpenseColumns {
  id: string;
  name: string;
  visible: boolean;
}
