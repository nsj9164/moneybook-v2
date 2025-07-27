import { UUID } from "@/types/ids";
import { supabase } from "../../utils/supabase";

export const deleteItem = async (
  table: string,
  id: number | UUID
): Promise<void> => {
  const { error } = await supabase.from(table).delete().eq("id", id);

  if (error) throw new Error(`삭제 실패: ${error.message}`);
};
