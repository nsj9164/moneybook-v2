import { EntityId } from "./ids";

export interface PayMethodEntity {
  id: EntityId;
  name: string;
  billingStartDay?: number;
  billingEndDay?: number;
  typeId: number;
  emoji: string;
  defaultYn: boolean;
}
