import { useState } from "react";

export const useMonthSelector = () => {
  const now = new Date();
  const [monthSelector, setMonthSelector] = useState({
    year: now.getFullYear(),
    month: now.getMonth(),
  });

  const [showMonthSelector, setShowMonthSelector] = useState(false);

  const controlMonthSelector = () => {
    setShowMonthSelector(!showMonthSelector);
  };

  return { monthSelector, showMonthSelector, controlMonthSelector };
};
