import { useState, useMemo } from "react";
import { startOfMonth, endOfMonth, format } from "date-fns";
import { useFirstExpenseYear } from "@/hooks/useFirstExpenseYear";

export const useBudgetDateFilter = () => {
  const currentYear = new Date().getFullYear();
  const [selectedDate, setSelectedDate] = useState({
    year: currentYear,
    month: new Date().getMonth(),
  });

  const selectedJsDate = useMemo(
    () => new Date(selectedDate.year, selectedDate.month),
    [selectedDate]
  );

  const startDate = useMemo(
    () => format(startOfMonth(selectedJsDate), "yyyy-MM-dd"),
    [selectedJsDate]
  );

  const endDate = useMemo(
    () => format(endOfMonth(selectedJsDate), "yyyy-MM-dd"),
    [selectedJsDate]
  );

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
    startDate,
    endDate,
    years,
    handleChangeYear,
    handleChangeMonth,
  };
};
