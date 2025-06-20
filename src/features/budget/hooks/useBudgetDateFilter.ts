import { useState, useMemo } from "react";
import { useFirstExpenseYear } from "@/features/budget/hooks/useFirstExpenseYear";

export const useBudgetDateFilter = () => {
  const currentYear = new Date().getFullYear();
  const [selectedDate, setSelectedDate] = useState({
    year: currentYear,
    month: new Date().getMonth(),
  });

  const { data: firstExpenseYear } = useFirstExpenseYear();
  const years = useMemo(() => {
    const start = firstExpenseYear ?? currentYear;
    return Array.from({ length: currentYear - start + 1 }, (_, i) => start + i);
  }, [firstExpenseYear, currentYear]);

  const handleChangeYear = (year: number) =>
    setSelectedDate((prev) => ({ ...prev, year }));

  const handleChangeMonth = (month: number) =>
    setSelectedDate((prev) => ({ ...prev, month }));

  return {
    firstExpenseYear,
    selectedDate,
    years,
    handleChangeYear,
    handleChangeMonth,
  };
};
