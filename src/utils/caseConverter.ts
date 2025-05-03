export const toCamelCase = (str: string): string =>
  str.replace(/[_-](\w)/g, (_, c) => c.toUpperCase());

export const toSnakeCase = (str: string): string =>
  str.replace(/([A-Z])/g, "_$1").toLowerCase();

export const formatKeyCase = (input: any, type: "camel" | "snake"): any => {
  if (Array.isArray(input)) {
    return input.map((item) => formatKeyCase(item, type));
  }

  if (input !== null && typeof input == "object") {
    return Object.entries(input).reduce((acc, [key, value]) => {
      const formatKey = type === "camel" ? toCamelCase(key) : toSnakeCase(key);
      acc[formatKey] = formatKeyCase(value, type);
      return acc;
    }, {} as Record<string, any>);
  }

  return input;
};
