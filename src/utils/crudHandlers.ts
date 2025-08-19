import { insertItem } from "@/api/supabase/insertItem";
import { updateItem } from "@/api/supabase/updateItem";
import { deleteItem } from "@/api/supabase/deleteItem";
import { patchOrAddItem } from "./patchOrAddItem";
import { UUID } from "@/types/ids";

export function createUpsertHandler<
  Draft extends object,
  Saved extends { id: number }
>(
  table: string,
  userId: UUID,
  setState?: React.Dispatch<React.SetStateAction<Saved[]>>
): (formData: Partial<Saved> & { id?: number }) => Promise<void> {
  return async (formData) => {
    const isEditing = typeof formData.id === "number";

    const saved: Saved = isEditing
      ? await updateItem<Saved>(table, formData as Saved, userId)
      : await insertItem<Draft, Saved>(table, formData as Draft, userId);

    setState?.((prev) => patchOrAddItem(prev, saved));
  };
}

export function createDeleteItemHandler<T extends { id: number }>(
  table: string,
  setState?: React.Dispatch<React.SetStateAction<T[]>>
): (id: number) => Promise<void> {
  return async (id: number) => {
    await deleteItem(table, id);
    setState?.((prev) => prev.filter((item) => item.id !== id));
  };
}
