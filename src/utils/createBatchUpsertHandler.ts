import { insertItem } from "@/api/supabase/insertItem";
import { updateItem } from "@/api/supabase/updateItem";
import { UUID } from "@/types/ids";

// 여러 개 insert/update를 한 번에 처리하는 핸들러
export function createBatchUpsertHandler<
  Insert extends object,
  Saved extends { id: number }
>(
  table: string,
  userId: UUID,
  setState?: React.Dispatch<React.SetStateAction<Saved[]>>
) {
  return async (items: (Insert | Partial<Saved>)[]) => {
    const results: Saved[] = [];

    for (const item of items) {
      const isEditing = typeof item.id === "number";

      const saved: Saved = isEditing
        ? await updateItem<Saved>(table, item as Saved, userId)
        : await insertItem<Insert, Saved>(table, item as Insert, userId);

      results.push(saved);
    }

    if (setState) {
      setState((prev) => patchOrAddItems(prev, results));
    }
  };
}
