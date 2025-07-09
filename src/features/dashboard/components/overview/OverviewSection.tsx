import {
  BudgetSummary,
  ExpenseSummary,
  IncomeSummary,
  SavingSummary,
} from "../../types/DashboardSummaryState";
import { BudgetCard } from "./BudgetCard";
import { ExpenseCard } from "./ExpenseCard";
import { IncomeCard } from "./IncomeCard";
import { SavingsCard } from "./SavingsCard";

type OverviewSectionProps = ExpenseSummary &
  IncomeSummary &
  SavingSummary &
  BudgetSummary;

export const OverviewSection = ({
  summaryData,
}: {
  summaryData: OverviewSectionProps;
}) => {
  const {
    expense,
    monthlyExpenseRate,
    isExpenseIncrease,
    income,
    monthlyIncomeRate,
    isIncomeIncrease,
    saving,
    savingRate,
    budget,
    budgetRate,
  } = summaryData;

  console.log("##############", expense);

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
        monthlyIncomeRate={monthlyIncomeRate}
        isIncomeIncrease={isIncomeIncrease}
      />

      {/* 저축 금액 */}
      <SavingsCard saving={saving} savingRate={savingRate} />

      {/* 예산 달성률 */}
      <BudgetCard budget={budget} budgetRate={budgetRate} />
    </div>
  );
};
