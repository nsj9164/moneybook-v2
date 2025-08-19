import { CardSection } from "@/components/common/layout/CardSection";
import { UsageProgress } from "../progress/UsageProgress";
import { SummarySection } from "../summary/SummarySection";
import { BudgetCategoryList } from "../list/BudgetCategoryList";
import { getBudgetSummaryInfo } from "../../hooks/useBudgetSummary";
import { useMemo } from "react";
import { BudgetDisplay, BudgetEntity } from "../../types";

interface BudgetOverviewProps {
  budgets: BudgetDisplay[];
  openModal: (budget?: BudgetEntity) => void;
  openConfirm: (id: number) => void;
  selectedDate: { year: number; month: number };
}

export const BudgetOverview = ({
  budgets,
  openModal,
  openConfirm,
  selectedDate,
}: BudgetOverviewProps) => {
  const summary = useMemo(
    () => getBudgetSummaryInfo(budgets, selectedDate),
    [budgets, selectedDate]
  );

  return (
    <>
      {/* 기간 선택 및 요약 정보 */}
      <SummarySection summary={summary} budgetsLen={budgets.length} />

      {/* 전체 예산 진행 상황 */}
      <UsageProgress
        budgetProgress={summary.budgetProgress}
        totalSpent={summary.totalSpent}
        totalBudget={summary.totalBudget}
      />

      {/* 카테고리별 예산 */}
      <CardSection title={"카테고리별 예산"}>
        <BudgetCategoryList
          budgets={budgets}
          openModal={openModal}
          openConfirm={openConfirm}
        />
      </CardSection>

      {/* 예산 조언 */}
      {/* <Advice /> */}
    </>
  );
};
