import { TempId } from "@/types/ids";

export type UpdExpenseFn<T> = <K extends keyof T>(
  value: T[K],
  id: number | TempId,
  key: K
) => void;

export type UpdAmountFn = (
  amount: string,
  id: number,
  peopleCnt: number
) => void;
