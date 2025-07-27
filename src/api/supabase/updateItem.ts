import { UUID } from "@/types/ids";
import { formatKeyCase } from "@/utils/caseConverter";
import { supabase } from "@/utils/supabase";

export const updateItem = async <T extends { id: UUID | number }>(
  table: string,
  item: Partial<T>,
  userId: UUID
): Promise<T> => {
  if (!item.id) throw new Error("업데이트하려면 id가 필요합니다");

  const snakeItem = formatKeyCase(item, "snake");
  const { id, ...updateData } = snakeItem;

  const { data, error } = await supabase
    .from(table)
    .update(updateData)
    .eq("id", id)
    .eq("user_id", userId)
    .select();

  if (error) throw new Error(`Update failed: ${error.message}`);
  if (!data || data.length === 0) throw new Error("수정 결과가 없습니다.");

  return formatKeyCase(data[0], "camel");
};
