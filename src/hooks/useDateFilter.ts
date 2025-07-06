import { useFirstExpenseYear } from "@/features/budget/hooks/useFirstExpenseYear";
import { useState } from "react";

export const useDateFilter = () => {
  const { data: firstExpenseYear } = useFirstExpenseYear();

  const now = new Date();
  const [selectedDate, setSelectedDate] = useState({
    year: now.getFullYear(),
    month: now.getMonth() + 1,
  });

  const [showDateSelector, setShowDateSelector] = useState(false);

  const toggleDateSelector = () => {
    setShowDateSelector((prev) => !prev);
  };

  const handleChangeYear = (year: number) => {
    setSelectedDate((prev) => ({ ...prev, year }));
  };

  const handleChangeMonth = (month: number) => {
    setSelectedDate((prev) => ({ ...prev, month }));
  };

  return {
    firstExpenseYear,
    selectedDate,
    showDateSelector,
    toggleDateSelector,
    handleChangeYear,
    handleChangeMonth,
  };
};
