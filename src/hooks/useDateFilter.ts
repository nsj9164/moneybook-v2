import { useFirstExpenseYear } from "@/features/budget/hooks/useFirstExpenseYear";
import { format } from "date-fns";
import { useMemo, useState } from "react";

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
    setShowDateSelector(false);
  };

  const goBackOneMonth = (year: number, month: number) => {
    if (month === 1) {
      handleChangeYear(year - 1);
      handleChangeMonth(12);
      return;
    }

    handleChangeMonth(month - 1);
  };

  const years =
    firstExpenseYear != null
      ? Array.from(
          { length: currentYear - firstExpenseYear + 1 },
          (_, i) => firstExpenseYear + i
        )
      : [];

  const targetDate = useMemo(
    () =>
      format(
        new Date(selectedDate.year, selectedDate.month - 1, 1),
        "yyyy-MM-dd"
      ),
    [selectedDate.year, selectedDate.month]
  );

  return {
    firstExpenseYear,
    selectedDate,
    years,
    targetDate,
    showDateSelector,
    toggleDateSelector,
    handleChangeYear,
    handleChangeMonth,
    goBackOneMonth,
  };
};
