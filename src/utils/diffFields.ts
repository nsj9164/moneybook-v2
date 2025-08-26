import equal from "fast-deep-equal";

export function diffFields<T extends object>(prev: T, next: T): Partial<T> {
  const out = {} as Partial<T>;

  for (const k of Object.keys(next) as (keyof T)[]) {
    const nv = next[k];
    if (nv === undefined) continue;
    if (!equal(prev[k], nv)) out[k] = nv;
  }

  return out;
}
