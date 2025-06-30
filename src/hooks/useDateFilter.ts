import { useState, useMemo } from "react";
import { useFirstExpenseYear } from "@/features/budget/hooks/useFirstExpenseYear";

export const useDateFilter = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const [selectedDate, setSelectedDate] = useState({
    year: currentYear,
    month: currentMonth,
  });

  const [showDateSelector, setShowDateSelector] = useState(false);

  const toggleDateSelector = () => setShowDateSelector(!showDateSelector);

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
    showDateSelector,
    toggleDateSelector,
    handleChangeYear,
    handleChangeMonth,
  };
};
