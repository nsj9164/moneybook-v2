import { useMemo } from "react";
import { useFetchCommonCodes } from "@/hooks/useFetchCommonCodes";
import { CommonCode } from "../types/common";

export const useCycleOptions = () => {
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
