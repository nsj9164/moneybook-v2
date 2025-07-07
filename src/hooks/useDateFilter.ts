import { useFirstExpenseYear } from "@/features/budget/hooks/useFirstExpenseYear";
import { useState } from "react";

export const useDateFilter = () => {
  const { data: firstExpenseYear } = useFirstExpenseYear();

  const now = new Date();
  const currentYear = now.getFullYear();
  const [selectedDate, setSelectedDate] = useState({
    year: currentYear,
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

  const years =
    firstExpenseYear != null
      ? Array.from(
          { length: currentYear - firstExpenseYear + 1 },
          (_, i) => firstExpenseYear + i
        )
      : [];

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
