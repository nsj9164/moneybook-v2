import { useFetchCommonCodes } from "@/hooks/fetchData/useFetchCommonCodes";
import { useMemo } from "react";
import { CommonCode } from "../types/common";

export interface Option {
  label: string;
  value: string | number;
}

export const useCycleOptions = (): Option[] => {
  const { data = [] } = useFetchCommonCodes("RECURRING_CYCLE_TYPE");

  return useMemo(
    () =>
      data.map((d: CommonCode) => ({
        label: d.codeName,
        value: d.codeValue,
      })),
    [data]
  );
};
