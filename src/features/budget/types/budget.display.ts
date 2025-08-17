import { BudgetSaved } from "./budget.entity";

export interface BudgetDisplay extends BudgetSaved {
  spent: number;
  name: string;
  emoji: string;
  color: string;
}
