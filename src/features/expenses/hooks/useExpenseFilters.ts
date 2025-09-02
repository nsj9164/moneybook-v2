import { ExpenseSaved } from "@/types";
import { format, sub } from "date-fns";
import { useMemo, useState } from "react";
import { ExpenseFiltersState, FilterKey } from "../types/filters";
import { matchHangul } from "@/utils/matchHangul";

export const useExpenseFilters = (expenses: ExpenseSaved[]) => {
  const makeInitial = (): ExpenseFiltersState => {
    const today = new Date();
    const subMonthToday = sub(today, { months: 1 });
    return {
      filterQuery: "",
      filterCategory: 0,
      filterPayMethod: 0,
      filterDifferentAmountOnly: false,
      filterRecurringOnly: false,
      startDate: format(subMonthToday, "yyyy-MM-dd"),
      endDate: format(today, "yyyy-MM-dd"),
    };
  };

  const [filters, setFilters] = useState(makeInitial());

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
        expense.date >= filters.startDate && expense.date <= filters.endDate;

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
  const numericFields: FilterKey[] = ["filterCategory", "filterPayMethod"];

  const handleFiltersChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.currentTarget;
    const { name, type, value } = target;

    let next: unknown;
    if (type === "checkbox") {
      next = (target as HTMLInputElement).checked;
    } else if (numericFields.includes(name as FilterKey)) {
      next = Number(value); // "0" -> 0
    } else {
      next = value;
    }

    setFilters((prev) => ({ ...prev, [name]: next }));
  };

  // 개별 검색 초기화
  const resetField = (e: React.MouseEvent<HTMLButtonElement>) => {
    const key = e.currentTarget.name as FilterKey;
    const fresh = makeInitial();
    setFilters((prev) => ({ ...prev, [key]: fresh[key] }));
  };

  // 전체 검색 초기화
  const resetFilters = () => {
    setFilters(makeInitial());
  };

  const isActiveFilters = useMemo(() => {
    const fresh = makeInitial();
    return (Object.keys(filters) as (keyof ExpenseFiltersState)[]).some(
      (k) => filters[k] !== fresh[k]
    );
  }, [filters]);

  return {
    filters,
    filteredExpenses,
    handleFiltersChange,
    resetField,
    resetFilters,
    isActiveFilters,
  };
};
