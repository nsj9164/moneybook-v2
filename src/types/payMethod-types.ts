export interface PayMethodEntity {
  id: number;
  name: string;
  billingStartDay?: number;
  billingEndDay?: number;
  typeId: number;
  emoji: string;
  defaultYn: boolean;
}

export type PayMethodInput = Partial<Omit<PayMethodEntity, "id">>;
