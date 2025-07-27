import { insertItem } from "@/api/supabase/insertItem";
import { updateItem } from "@/api/supabase/updateItem";
import { patchOrAddItem } from "./patchOrAddItem";
import { deleteItem } from "@/api/supabase/deleteItem";
import { UUID } from "@/types/ids";

export function createUpsertHandler<T extends { id: UUID | number }>(
  table: string,
  userId: string,
  setState: React.Dispatch<React.SetStateAction<T[]>>
) {
  return async (item: Partial<T>) => {
    const isEditing = "id" in item && typeof item.id === "number";

    const saved: T = isEditing
      ? await updateItem<T>(table, item, userId)
      : await insertItem<T>(table, item, userId);

    setState((prev) => patchOrAddItem(prev, saved));
  };
}

export function createDeleteItemHandler<T extends { id: UUID | number }>(
  table: string,
  setState: React.Dispatch<React.SetStateAction<T[]>>
) {
  return async (id: UUID | number) => {
    await deleteItem(table, id);
    setState((prev) => prev.filter((item) => item.id !== id));
  };
}
