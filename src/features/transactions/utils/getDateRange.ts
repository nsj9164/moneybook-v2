import { QuickPeriodRange } from "../types/filters";

export const getQuickPeriodRange = (period: string): QuickPeriodRange => {
  const now = new Date();

  switch (period) {
    case "thisMonth": {
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      return {
        startDate: start.toISOString().split("T")[0],
        endDate: end.toISOString().split("T")[0],
      };
    }
    case "lastMonth": {
      const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const end = new Date(now.getFullYear(), now.getMonth(), 0);
      return {
        startDate: start.toISOString().split("T")[0],
        endDate: end.toISOString().split("T")[0],
      };
    }
    case "last3Months": {
      const start = new Date(now.getFullYear(), now.getMonth() - 2, 1);
      return {
        startDate: start.toISOString().split("T")[0],
        endDate: now.toISOString().split("T")[0],
      };
    }
    case "last6Months": {
      const start = new Date(now.getFullYear(), now.getMonth() - 5, 1);
      return {
        startDate: start.toISOString().split("T")[0],
        endDate: now.toISOString().split("T")[0],
      };
    }
    case "thisYear": {
      const start = new Date(now.getFullYear(), 0, 1);
      return {
        startDate: start.toISOString().split("T")[0],
        endDate: now.toISOString().split("T")[0],
      };
    }
    default:
      return {
        startDate: "",
        endDate: "",
      };
  }
};
