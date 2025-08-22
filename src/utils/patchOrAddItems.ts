import { UUID } from "@/types/ids";
import { patchOrAddItem } from "./patchOrAddItem";

export function patchOrAddItems<T extends { id: number | UUID }>(
  list: T[],
  updatedItems: T[]
): T[] {
  return updatedItems.reduce((acc, cur) => patchOrAddItem(acc, cur), list);
}
