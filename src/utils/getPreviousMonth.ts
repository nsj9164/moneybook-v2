export const getPreviousMonth = (month: number) =>
  month === 1 ? 12 : month - 1;
