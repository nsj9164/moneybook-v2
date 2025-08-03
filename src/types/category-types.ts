import { EntityId, UUID } from "@/types/ids";

export interface CategoryBase {
  name: string;
  budget: number;
  transactionType: number;
  emoji: string;
  color: string;
  defaultYn: boolean;
  userId: UUID;
}

export interface CategorySaved extends CategoryBase {
  id: number;
}

export interface CategoryDraft extends CategoryBase {
  id: EntityId;
}
