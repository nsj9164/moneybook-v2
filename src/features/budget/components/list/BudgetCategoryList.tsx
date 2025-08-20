import { BudgetDisplay, BudgetSaved } from "../../types";
import { BudgetCategoryItem } from "./BudgetCategoryItem";

interface BudgetCategoryListProps {
  budgets: BudgetDisplay[];
  openModal: (budget?: BudgetSaved) => void;
  openConfirm: (id: number) => void;
}

export const BudgetCategoryList = ({
  budgets,
  openModal,
  openConfirm,
}: BudgetCategoryListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {budgets.map((budget) => {
        const progress = Math.round((budget.spent / budget.amount) * 100);
        const diffAmount = budget.amount - budget.spent;

        return (
          <BudgetCategoryItem
            key={budget.id}
            budget={budget}
            progress={progress}
            diffAmount={diffAmount}
            openModal={() => openModal(budget)}
            openConfirm={openConfirm}
          />
        );
      })}
    </div>
  );
};
