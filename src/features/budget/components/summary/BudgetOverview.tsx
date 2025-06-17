import { CardSection } from "@/components/common/layout/CardSection";
import { BudgetDisplay, BudgetEntity } from "@/types";
import { UsageProgress } from "../progress/UsageProgress";
import { SummarySection } from "./SummarySection";
import { BudgetCategoryList } from "../list/BudgetCategoryList";

interface BudgetOverviewProps {
  budgets: BudgetDisplay[];
  openModal: (budget?: BudgetEntity) => void;
  onDelete: (id: number) => void;
}

export const BudgetOverview = ({
  budgets,
  openModal,
  onDelete,
}: BudgetOverviewProps) => {
  // 총 예산 및 지출 계산
  const totalBudget = budgets.reduce((sum, list) => sum + list.amount, 0);
  const totalSpent = budgets.reduce((sum, list) => sum + list.spent, 0);
  const remainingBudget = totalBudget - totalSpent;
  const budgetProgress = Math.round((totalSpent / totalBudget) * 100);

  return (
    <>
      {/* 기간 선택 및 요약 정보 */}
      <SummarySection
        totalBudget={totalBudget}
        budgetLen={budgets.length}
        totalSpent={totalSpent}
        budgetProgress={budgetProgress}
        remainingBudget={remainingBudget}
      />

      {/* 전체 예산 진행 상황 */}
      <UsageProgress
        budgetProgress={budgetProgress}
        totalSpent={totalSpent}
        totalBudget={totalBudget}
      />

      {/* 카테고리별 예산 */}
      <CardSection title={"카테고리별 예산"}>
        <BudgetCategoryList
          budgets={budgets}
          openModal={openModal}
          onDelete={onDelete}
        />
      </CardSection>

      {/* 예산 조언 */}
      {/* <Advice /> */}
    </>
  );
};
