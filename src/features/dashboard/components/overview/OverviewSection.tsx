import { DashboardSummaryResponse } from "../../types/DashboardSummary";
import { BudgetCard } from "./BudgetCard";
import { ExpenseCard } from "./ExpenseCard";
import { IncomeCard } from "./IncomeCard";
import { SavingsCard } from "./SavingsCard";

export const OverviewSection = ({
  summaryData,
}: {
  summaryData: DashboardSummaryResponse;
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* 이번 달 지출 */}
      <ExpenseCard
        expense={expense}
        monthlyExpenseRate={monthlyExpenseRate}
        isExpenseIncrease={isExpenseIncrease}
      />

      {/* 이번 달 수입 */}
      <IncomeCard
        income={income}
        lastIncome={lastIncome}
        monthlyIncomeRate={monthlyIncomeRate}
        isIncomeIncrease={isIncomeIncrease}
      />

      {/* 저축 금액 */}
      <SavingsCard saving={saving} savingRate={savingRate} />

      {/* 예산 달성률 */}
      <BudgetCard />
    </div>
  );
};
