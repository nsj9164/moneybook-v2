import { TempId, UUID } from "@/types/ids";

export interface CategoryBase {
  name: string;
  transactionType: number;
  emoji: string;
  color: string;
  defaultYn: boolean;
  userId: UUID;
}

export interface CategorySaved extends CategoryBase {
  id: number;
}

export interface CategoryInsertDTO extends CategoryBase {
  id: TempId;
}
