import equal from "fast-deep-equal";

export function filterEmptyFields<T extends object>(form: T): Partial<T> {
  const result: Partial<T> = {};
  for (const key in form) {
    const value = form[key];

    if (value !== "" && value !== null && value !== undefined) {
      result[key] = value;
    }
  }
  return result;
}

export function diffFields<T extends object>(prev: T, next: T): Partial<T> {
  const out = {} as Partial<T>;

  for (const k of Object.keys(next) as (keyof T)[]) {
    const nv = next[k];
    if (nv === undefined) continue;
    if (!equal(prev[k], nv)) out[k] = nv;
  }

  return out;
}
