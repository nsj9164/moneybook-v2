export interface CategoryStatInput {
  id: number;
  budget: number;
}

export interface CategoryStatDisplay extends CategoryStatInput {
  name: string;
  emoji: string;
  color: string;
  spent: number;
  budgetYn: boolean;
}
