import { IExpense } from "@/types/expense-types";
import { format, sub } from "date-fns";
import { useMemo, useState } from "react";
import { ExpenseFiltersState, FilterKey } from "../types/filters";

export const useExpenseFilters = (expenses: IExpense[]) => {
  const today = new Date();
  const subMonthToday = sub(today, { months: 1 });

  const initialFilters = {
    filterQuery: "",
    filterCategory: 0,
    filterPayMethod: 0,
    filterDifferentAmountOnly: false,
    filterRecurringOnly: false,
    filterStartDate: format(subMonthToday, "yyyy-MM-dd"),
    filterEndDate: format(today, "yyyy-MM-dd"),
  };

  const [filters, setFilters] = useState(initialFilters);

  // 초성 검색
  const matchHangul = (filterValue: string, expenseValue: string) => {
    const normalize = (str: string) =>
      hangul.disassemble(str.toLowerCase().trim()).join("");
    return normalize(expenseValue).includes(normalize(filterValue));
  };

  // expenses에 검색 적용
  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      const matchQuery =
        matchHangul(filters.filterQuery, expense.itemName) ||
        matchHangul(filters.filterQuery, expense.note);

      const matchCategory =
        filters.filterCategory === 0 ||
        filters.filterCategory === expense.categoryId;

      const matchPayMethod =
        filters.filterPayMethod === 0 ||
        filters.filterPayMethod === expense.paymentMethodId;

      const matchDifferent = filters.filterDifferentAmountOnly
        ? expense.amount !== expense.actualAmount
        : true;

      const matchRecurring = filters.filterRecurringOnly
        ? expense.recurringExpenseId
        : true;

      const matchDateRange =
        expense.date >= filters.filterStartDate &&
        expense.date <= filters.filterEndDate;

      return (
        matchQuery &&
        matchCategory &&
        matchPayMethod &&
        matchDifferent &&
        matchRecurring &&
        matchDateRange
      );
    });
  }, [expenses, filters]);

  // 검색 적용
  const numbericFields = ["filterCategory", "filterPayMethod"];
  const handleFiltersChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const key = e.currentTarget.name;
    const rawValue = e.currentTarget.value;

    const parsedValue = numbericFields.includes(key)
      ? Number(rawValue)
      : rawValue;

    setFilters((prev) => ({ ...prev, [key]: parsedValue }));
  };

  // 개별 검색 초기화
  const resetField = (e: React.MouseEvent<HTMLButtonElement>) => {
    const key = e.currentTarget.name as FilterKey;
    setFilters((prev) => ({ ...prev, [key]: initialFilters[key] }));
  };

  // 전체 검색 초기화
  const resetFilters = () => {
    setFilters(initialFilters);
  };

  return {
    filters,
    setFilters,
    filteredExpenses,
    handleFiltersChange,
    resetField,
    resetFilters,
  };
};
