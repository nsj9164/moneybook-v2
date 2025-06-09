import { UUID } from "./expense-types";

export interface CategoryEntity {
  id: number;
  name: string;
  budget: number;
  transactionType: number;
  emoji: string;
  color: string;
  defaultYn: boolean;
  userId: UUID;
}

export type CategoryInput = Partial<Omit<CategoryEntity, "id">>;
