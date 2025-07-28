import { EntityId, UUID } from "@/types/ids";

export interface CategoryEntity {
  id: EntityId;
  name: string;
  budget: number;
  transactionType: number;
  emoji: string;
  color: string;
  defaultYn: boolean;
  userId: UUID;
}
