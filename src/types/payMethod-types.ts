import { TempId } from "./ids";

export interface PayMethodBase {
  name: string;
  billingStartDay?: number;
  billingEndDay?: number;
  typeId: number;
  emoji: string;
  defaultYn: boolean;
}

export interface PayMethodInsertDTO extends PayMethodBase {
  id: TempId;
}

export interface PayMethodSaved extends PayMethodBase {
  id: number;
}
