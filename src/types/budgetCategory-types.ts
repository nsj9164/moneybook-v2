export interface BudgetFormInput {
  categoryId: string;
  budget: number;
}

export interface BudgetSubmitInput {
  id: number;
  budget: number;
  budgetYn: boolean;
}

export interface BudgetDisplay {
  categoryId: number;
  budget: number;
  name: string;
  emoji: string;
  color: string;
  spent: number;
  budgetYn: boolean;
}
