export const handleQuickPeriod = (period: string) => {
  const now = new Date();
  setQuickPeriod(period);
  setSelectedMonth("");

  switch (period) {
    case "thisMonth":
      const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      const thisMonthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      setStartDate(thisMonthStart.toISOString().split("T")[0]);
      setEndDate(thisMonthEnd.toISOString().split("T")[0]);
      break;
    case "lastMonth":
      const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
      setStartDate(lastMonthStart.toISOString().split("T")[0]);
      setEndDate(lastMonthEnd.toISOString().split("T")[0]);
      break;
    case "last3Months":
      const last3MonthsStart = new Date(
        now.getFullYear(),
        now.getMonth() - 2,
        1
      );
      setStartDate(last3MonthsStart.toISOString().split("T")[0]);
      setEndDate(now.toISOString().split("T")[0]);
      break;
    case "last6Months":
      const last6MonthsStart = new Date(
        now.getFullYear(),
        now.getMonth() - 5,
        1
      );
      setStartDate(last6MonthsStart.toISOString().split("T")[0]);
      setEndDate(now.toISOString().split("T")[0]);
      break;
    case "thisYear":
      const thisYearStart = new Date(now.getFullYear(), 0, 1);
      setStartDate(thisYearStart.toISOString().split("T")[0]);
      setEndDate(now.toISOString().split("T")[0]);
      break;
    default:
      setStartDate("");
      setEndDate("");
      break;
  }
};
