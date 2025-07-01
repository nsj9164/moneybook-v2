import { ExpenseCard } from "./overview/ExpenseCard";
import { FixedExpenseCard } from "./overview/FixedExpenseCard";
import { IncomeCard } from "./overview/IncomeCard";
import { SavingsCard } from "./overview/SavingsCard";

interface OverviewSectionProps {
  divClass: string;
  title: string;
  monthlyAmount: number;
}

export const OverviewSection = ({}: OverviewSectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* 이번 달 총 지출 */}
      <ExpenseCard />

      {/* 이번 달 총 수입 */}
      <IncomeCard />

      {/* 이번 달 저축 */}
      <SavingsCard />

      {/* 고정 지출 */}
      <FixedExpenseCard />
    </div>
  );
};
