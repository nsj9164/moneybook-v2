import { UUID } from "@/types/ids";
import { formatKeyCase } from "./caseConverter";
import { supabase } from "./supabase";

export async function deleteItem(
  table: string,
  id: number | UUID,
  onSuccess?: () => void
) {
  const { error } = await supabase.from(table).delete().eq("id", id);

  if (error) {
    console.error("Delete error:", error.message);
    return;
  }

  onSuccess?.();
}

export async function insertItem<T extends object>(
  table: string,
  item: T,
  userId: UUID,
  onSuccess?: (row: T) => void
) {
  const snakeItem = formatKeyCase(item, "snake");
  const { id, ...rest } = snakeItem;
  const insertData = { ...rest, user_id: userId };

  const { data, error } = await supabase
    .from(table)
    .insert(insertData)
    .select();

  if (error) throw new Error(`Insert failed: ${error.message}`);
  if (data && data.length > 0) {
    const mapped = formatKeyCase(data[0], "camel");
    onSuccess?.(mapped);
  }
}

export async function updateItem<T extends { id: number | string }>(
  table: string,
  item: Partial<T>,
  userId: UUID,
  onSuccess?: (row: T) => void
) {
  if (!item.id) throw new Error("updateItem requires 'id' field");

  const snakeItem = formatKeyCase(item, "snake");
  const { id, ...updateData } = snakeItem;

  const { data, error } = await supabase
    .from(table)
    .update(updateData)
    .eq("id", id)
    .eq("user_id", userId)
    .select();

  if (error) throw new Error(`Update failed: ${error.message}`);
  if (data && data.length > 0) {
    const mapped = formatKeyCase(data[0], "camel");
    onSuccess?.(mapped);
  }
}
