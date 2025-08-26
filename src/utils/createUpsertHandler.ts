import { insertItem } from "@/api/supabase/insertItem";
import { updateItem } from "@/api/supabase/updateItem";
import { deleteItem } from "@/api/supabase/deleteItem";
import { TempId, UUID } from "@/types/ids";
import { patchOrAddItem } from "./patchOrAddItem";
import { patchOrAddItems } from "./patchOrAddItems";

function isUpdateTarget<Saved extends { id: number }>(
  item: Insert<any> | Update<Saved>
): item is Update<Saved> {
  return typeof (item as any).id === "number";
}

export type Insert<T> = T & { id?: TempId };
export type Update<T extends { id: number }> = Partial<T> & { id: number };

export function createUpsertHandler<Base, Saved extends { id: number }>(
  table: string,
  userId: UUID,
  setState?: React.Dispatch<React.SetStateAction<Saved[]>>
) {
  // 단일 저장
  const upsertOne = async (
    item: Insert<Base> | Update<Saved>
  ): Promise<Saved> => {
    if (isUpdateTarget(item)) {
      const saved = await updateItem<Saved>(table, item, userId);
      setState?.((prev) => patchOrAddItem(prev, saved));
      return saved;
    } else {
      const saved = await insertItem<Insert<Base>, Saved>(table, item, userId);
      setState?.((prev) => patchOrAddItem(prev, saved));
      return saved;
    }
  };

  // 여러 개 저장
  const upsertMany = async (
    items: (Insert<Base> | Update<Saved>)[]
  ): Promise<Saved[]> => {
    const results: Saved[] = [];
    for (const item of items) {
      const saved = await upsertOne(item);
      results.push(saved);
    }
    setState?.((prev) => patchOrAddItems(prev, results));
    return results;
  };

  return { upsertOne, upsertMany };
}

export function createDeleteHandler<Saved extends { id: number }>(
  table: string,
  setState?: React.Dispatch<React.SetStateAction<Saved[]>>
): (id: number) => Promise<void> {
  return async (id: number) => {
    await deleteItem(table, id);
    setState?.((prev) => prev.filter((item) => item.id !== id));
  };
}
