import { isEqual } from "lodash";

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
  const result: Partial<T> = {};

  for (const key in next) {
    if (!isEqual(prev[key], next[key])) {
      result[key] = next[key];
    }
  }

  return result;
}
