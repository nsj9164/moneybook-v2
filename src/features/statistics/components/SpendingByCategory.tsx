import { CategoryBreakdown } from "./CategoryBreakdown";
import { WeekdayBreakdown } from "./WeekdayBreakdown";

export const SpendingByCategory = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <CategoryBreakdown />

      <WeekdayBreakdown />
    </div>
  );
};
