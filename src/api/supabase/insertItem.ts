import { UUID } from "@/types/ids";
import { formatKeyCase } from "@/utils/caseConverter";
import { supabase } from "@/utils/supabase";
import { omit } from "lodash";

export const insertItem = async <T extends object>(
  table: string,
  item: Partial<Omit<T, "id">>,
  userId: UUID
): Promise<T> => {
  const snakeItem = formatKeyCase(item, "snake");
  const insertData = { ...omit(snakeItem, ["id"]), user_id: userId };

  const { data, error } = await supabase
    .from(table)
    .insert(insertData)
    .select();

  if (error) throw new Error(`등록 실패: ${error.message}`);
  if (!data || data.length === 0) throw new Error("등록 결과가 없습니다");

  return formatKeyCase(data[0], "camel");
};
