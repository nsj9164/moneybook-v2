export function createPaginateAfterAdd(
  getNextTotal: () => number,
  goToLastPageIfNeeded: (nextTotal: number) => void
) {
  return () => {
    const nextTotal = getNextTotal();
    goToLastPageIfNeeded(nextTotal);
  };
}
