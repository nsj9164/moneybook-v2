import { RecurringSaved } from "@/types";

// 고정지출 cycle에 따른 월 환산
const cycleMultipliers: Record<number, number> = {
  1: 30, // 매일
  2: 4.33, // 매주
  3: 2.17, // 격주
  4: 1, // 매월
  5: 0.5, // 격월
  6: 1 / 3, // 분기
  7: 1 / 6, // 반기
  8: 1 / 12, // 연간
};

// 고정지출 항목_월간 환산 금액
export function getMonthlyAmount(recurring: RecurringSaved): number {
  const multiplier = cycleMultipliers[recurring.cycle] ?? 4;
  return recurring.amount * multiplier;
}

// 모든 고정지출_총 월간 금액
export function calcTotalMonthlyAmount(recurrings: RecurringSaved[]): number {
  return recurrings
    .filter((expense) => expense.isActive)
    .reduce((sum, expense) => sum + getMonthlyAmount(expense), 0);
}
