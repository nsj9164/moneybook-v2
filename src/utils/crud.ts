import { supabase } from "./supabase";

export const deleteItem = async (table: string, id: number) => {
  if (window.confirm("이 카테고리를 삭제하시겠습니까?")) {
    const { error } = await supabase.from("categories").delete().eq("id", id);

    if (error) {
      console.error("Delete error:", error.message);
      return;
    }
  }
};

export const saveItem = async (
  table: string,
  category: any,
  onSuccess?: () => void
) => {
  //   if (!category.isModified) return;

  const { error } = await supabase.from("categories").upsert(category).select();

  if (error) {
    console.error("Insert error:", error.message);
  } else {
    onSuccess?.();
  }
};
