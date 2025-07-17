import {
  BudgetSummary,
  ExpenseSummary,
  IncomeSummary,
  SavingSummary,
} from "@/types/\bOverviewSummary";
import { BudgetCard } from "./BudgetCard";
import { ExpenseCard } from "./ExpenseCard";
import { IncomeCard } from "./IncomeCard";
import { SavingsCard } from "./SavingsCard";

interface OverviewSectionProps {
  expenseData: ExpenseSummary;
  incomeData: IncomeSummary;
  savingData: SavingSummary;
  budgetData: BudgetSummary;
}

export const OverviewSection = ({
  expenseData,
  incomeData,
  savingData,
  budgetData,
}: OverviewSectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* 이번 달 지출 */}
      <ExpenseCard expenseData={expenseData} />

      {/* 이번 달 수입 */}
      <IncomeCard incomeData={incomeData} />

      {/* 저축 금액 */}
      <SavingsCard savingData={savingData} />

      {/* 예산 달성률 */}
      <BudgetCard budgetData={budgetData} />
    </div>
  );
};
