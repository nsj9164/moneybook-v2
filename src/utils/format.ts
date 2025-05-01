export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("ko-KR", {
    style: "decimal",
    currency: "KRW",
    maximumFractionDigits: 0,
  }).format(amount);
};
