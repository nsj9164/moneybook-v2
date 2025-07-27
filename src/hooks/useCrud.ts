import { createSaveHandler, createDeleteHandler } from "@/utils/crudHandlers";

export function useCrud<T>(
  table: string,
  userId: string,
  setState: React.Dispatch<React.SetStateAction<T[]>>
) {
  const onSave = createSaveHandler<T>(table, userId, setState);
  const onDelete = createDeleteHandler<T>(table, setState);
  return { onSave, onDelete };
}
