import { Insert } from "@/types/crud";
import { filterEmptyFields } from "@/utils/filterEmptyFields";
import { BaseMap, SavedMap } from "../types/GenericFormTypes";

export function toInsert<K extends keyof BaseMap>(
  data: SavedMap[K]
): Insert<BaseMap[K]> {
  return filterEmptyFields(data) as unknown as Insert<BaseMap[K]>;
}
