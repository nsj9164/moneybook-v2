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
