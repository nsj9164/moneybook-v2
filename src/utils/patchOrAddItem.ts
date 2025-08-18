import { UUID } from "@/types/ids";

export function patchOrAddItem<T extends { id: number | UUID }>(
  list: T[],
  updated: T
): T[] {
  console.log("patchOrAddItem:::", list, updated);

  const idx = list.findIndex((item) => item.id === updated.id);
  if (idx >= 0) {
    return [...list.slice(0, idx), updated, ...list.slice(idx + 1)];
  }
  return [...list, updated];
}
