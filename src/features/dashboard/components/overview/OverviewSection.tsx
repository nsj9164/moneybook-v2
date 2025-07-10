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

interface OverviewSectionProps {
  expenseSummary: ExpenseSummary;
  incomeSummary: IncomeSummary;
  savingSummary: SavingSummary;
  budgetSummary: BudgetSummary;
}

export const OverviewSection = ({
  expenseSummary,
  incomeSummary,
  savingSummary,
  budgetSummary,
}: OverviewSectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* 이번 달 지출 */}
      <ExpenseCard expenseSummary={expenseSummary} />

      {/* 이번 달 수입 */}
      <IncomeCard incomeSummary={incomeSummary} />

      {/* 저축 금액 */}
      <SavingsCard savingSummary={savingSummary} />

      {/* 예산 달성률 */}
      <BudgetCard budgetSummary={budgetSummary} />
    </div>
  );
};
