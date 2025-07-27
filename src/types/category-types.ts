import { UUID } from "@/types/ids";

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

export interface CategoryFormInput {
  id?: number;
  name: string;
  budget: number;
  transactionType: number;
  emoji: string;
  color: string;
  defaultYn: boolean;
  userId: UUID;
}
