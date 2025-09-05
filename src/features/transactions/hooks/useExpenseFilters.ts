import { TransactionSaved } from "@/types";
import { format, sub } from "date-fns";
import { useMemo, useState } from "react";
import { TransactionFiltersState, FilterKey } from "../types/filters";
import { matchHangul } from "@/utils/matchHangul";

export const useTransactionFilters = (transactions: TransactionSaved[]) => {
  const makeInitial = (): TransactionFiltersState => {
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
  const filteredData = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchQuery =
        matchHangul(filters.filterQuery, transaction.itemName) ||
        matchHangul(filters.filterQuery, transaction.note);

      const matchCategory =
        filters.filterCategory === 0 ||
        filters.filterCategory === transaction.categoryId;

      const matchPayMethod =
        filters.filterPayMethod === 0 ||
        filters.filterPayMethod === transaction.paymentMethodId;

      const matchDifferent = filters.filterDifferentAmountOnly
        ? transaction.amount !== transaction.actualAmount
        : true;

      const matchRecurring = filters.filterRecurringOnly
        ? transaction.recurringExpenseId
        : true;

      const matchDateRange =
        transaction.date >= filters.startDate &&
        transaction.date <= filters.endDate;

      return (
        matchQuery &&
        matchCategory &&
        matchPayMethod &&
        matchDifferent &&
        matchRecurring &&
        matchDateRange
      );
    });
  }, [transactions, filters]);

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
      next = Number(value);
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
    return (Object.keys(filters) as (keyof TransactionFiltersState)[]).some(
      (k) => filters[k] !== fresh[k]
    );
  }, [filters]);

  return {
    filters,
    filteredData,
    handleFiltersChange,
    resetField,
    resetFilters,
    isActiveFilters,
  };
};
