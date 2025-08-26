import { Update } from "@/types/crud";
import { SavedMap } from "../types/GenericFormTypes";

export function toUpdate<K extends keyof SavedMap>(
  id: number,
  diffed: Omit<Partial<SavedMap[K]>, "id">
): Update<SavedMap[K]> {
  return { ...diffed, id } as Update<SavedMap[K]>;
}
