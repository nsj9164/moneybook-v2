import { ExpenseCard } from "./ExpenseCard";
import { FixedExpenseCard } from "./FixedExpenseCard";
import { IncomeCard } from "./IncomeCard";
import { SavingsCard } from "./SavingsCard";

interface ContentCardProps {
  divClass: string;
  title: string;
  monthlyAmount: number;
}

export const OverviewCards = ({}: ContentCardProps) => {
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
