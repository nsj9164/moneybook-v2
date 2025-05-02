export const formatCurrency = (amount: string | number): string => {
  const numbericAmount =
    typeof amount === "string" ? parseCurrency(amount) : amount;

  return new Intl.NumberFormat("ko-KR", {
    style: "decimal",
    maximumFractionDigits: 0,
  }).format(numbericAmount);
};

export const parseCurrency = (formatted: string): number => {
  return Number(formatted.replace(/[^\d.-]+/g, ""));
};
