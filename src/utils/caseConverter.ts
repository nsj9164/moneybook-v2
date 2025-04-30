export const toCamelCase = (str: string): string =>
  str.replace(/[_-](\w)/g, (_, c) => c.toUpperCase());

export const keysToCamelCase = (input: any): any => {
  if (Array.isArray(input)) {
    return input.map(keysToCamelCase);
  }

  if (input !== null && typeof input == "object") {
    return Object.entries(input).reduce((acc, [key, value]) => {
      const camelKey = toCamelCase(key);
      acc[camelKey] = value;
      return acc;
    }, {} as Record<string, any>);
  }
};
