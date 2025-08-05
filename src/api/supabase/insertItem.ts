import { UUID } from "@/types/ids";
import { formatKeyCase } from "@/utils/caseConverter";
import { supabase } from "@/utils/supabase";
import { omit } from "lodash";

export const insertItem = async <
  Insert extends object,
  Return extends { id: number }
>(
  table: string,
  item: Insert,
  userId: UUID
): Promise<Return> => {
  const snakeItem = formatKeyCase(item, "snake");
  const insertData = { ...omit(snakeItem, ["id"]), user_id: userId };

  const { data, error } = await supabase
    .from(table)
    .insert(insertData)
    .select()
    .single();

  if (error) throw new Error(`등록 실패: ${error.message}`);
  if (!data) throw new Error("등록 결과가 없습니다");

  return formatKeyCase(data, "camel");
};
