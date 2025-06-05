import { UUID } from "@/types/expense-types";
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

export async function saveItem<T extends object>(
  table: string,
  item: Partial<T>,
  userId: UUID,
  onSuccess?: (row: T) => void
) {
  console.log("user!!!", userId, item);
  const snakeItem = formatKeyCase(item, "snake");
  const insertData = { ...snakeItem, user_id: userId };
  console.log("insertData!!!!", insertData);

  const { data, error } = await supabase
    .from(table)
    .upsert(insertData)
    .select();

  if (error) {
    console.error("Insert error:", error.message);
  } else if (data && data.length) {
    const mappedData = formatKeyCase(data[0], "camel");
    onSuccess?.(mappedData);
  }
}
