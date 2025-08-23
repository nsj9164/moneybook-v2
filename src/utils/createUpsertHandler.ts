import { insertItem } from "@/api/supabase/insertItem";
import { updateItem } from "@/api/supabase/updateItem";
import { deleteItem } from "@/api/supabase/deleteItem";
import { TempId, UUID } from "@/types/ids";
import { patchOrAddItem } from "./patchOrAddItem";
import { patchOrAddItems } from "./patchOrAddItems";
import { useState } from "react";

function isSaved<Saved extends { id: number }>(item: {
  id?: number | TempId;
}): item is Saved {
  return typeof item.id === "number";
}

export function createUpsertHandler<
  Insert extends { id?: TempId },
  Saved extends { id: number }
>(
  table: string,
  userId: UUID,
  setState?: React.Dispatch<React.SetStateAction<Saved[]>>
) {
  const [loading, setLoading] = useState(true);
  // 단일 저장
  const upsertOne = async (item: Insert | Partial<Saved>): Promise<Saved> => {
    if (isSaved<Saved>(item)) {
      const saved = await updateItem<Saved>(table, item, userId);
      setState?.((prev) => patchOrAddItem(prev, saved));
      return saved;
    } else {
      const insertItemData = item as Insert;
      const saved = await insertItem<Insert, Saved>(
        table,
        insertItemData,
        userId
      );
      setState?.((prev) => patchOrAddItem(prev, saved));
      return saved;
    }
    setLoading(false);
  };

  // 여러 개 저장
  const upsertMany = async (
    items: (Insert | Partial<Saved>)[]
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
