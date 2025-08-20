// calculate_실제지출
export const calActualAmount = (amount: number, peopleCnt: number) => {
  if (peopleCnt <= 0) return 0;
  return Math.floor(amount / peopleCnt);
};
