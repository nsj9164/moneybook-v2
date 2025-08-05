import { insertItem } from "@/api/supabase/insertItem";
import { updateItem } from "@/api/supabase/updateItem";
import { deleteItem } from "@/api/supabase/deleteItem";
import { patchOrAddItem } from "./patchOrAddItem";

export function createUpsertHandler<
  Draft extends Partial<Saved>,
  Saved extends { id: number }
>(
  table: string,
  userId: string,
  setState: React.Dispatch<React.SetStateAction<Saved[]>>
) {
  return async (item: Draft | Saved) => {
    const isEditing = "id" in item && typeof item.id === "number";

    const saved: Saved = isEditing
      ? await updateItem<Saved>(table, item, userId)
      : await insertItem<Saved>(table, item, userId);

    setState((prev) => patchOrAddItem(prev, saved));
  };
}

export function createDeleteItemHandler<T extends { id: number }>(
  table: string,
  setState: React.Dispatch<React.SetStateAction<T[]>>
) {
  return async (id: number) => {
    await deleteItem(table, id);
    setState((prev) => prev.filter((item) => item.id !== id));
  };
}
