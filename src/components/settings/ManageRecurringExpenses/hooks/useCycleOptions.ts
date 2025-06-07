import { useMemo } from "react";
import { useFetchCommonCodes } from "@/hooks/useFetchCommonCodes";
import { CommonCode } from "../types/common";

interface Option {
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
