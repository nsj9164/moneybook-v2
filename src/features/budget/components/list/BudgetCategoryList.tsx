import { BudgetDisplay } from "../../types/budget.display";
import { BudgetSaved } from "../../types/budget.entity";
import { BudgetCategoryItem } from "./BudgetCategoryItem";

interface BudgetCategoryListProps {
  budgets: BudgetDisplay[];
  openModal: (budget?: BudgetSaved) => void;
  onDelete: (id: number) => void;
}

export const BudgetCategoryList = ({
  budgets,
  openModal,
  onDelete,
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
            onDelete={onDelete}
          />
        );
      })}
    </div>
  );
};
