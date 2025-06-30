import { useState } from "react";

export const useMonthSelector = () => {
  const now = new Date();
  const [monthSelector, setMonthSelector] = useState({
    year: now.getFullYear(),
    month: now.getMonth(),
  });

  const [showDateSelector, setShowDateSelector] = useState(false);

  const toggleDateSelector = () => setShowDateSelector(!showDateSelector);

  return { monthSelector, showMonthSelector, controlMonthSelector };
};
