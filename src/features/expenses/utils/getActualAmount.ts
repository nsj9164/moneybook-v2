import { parseCurrency } from "@/utils/format";

// return calculate_실제지출
const getSplitAmount = (peopleCnt: number, id: number) => {
  props.setNewExpenses((prev) =>
    prev.map((item) => {
      if (item.id === id) {
        const splitAmount = calActualAmount(item.amount, peopleCnt);
        return {
          ...item,
          actualAmount: splitAmount,
          numberOfPeople: peopleCnt,
        };
      }
      return item;
    })
  );
};

// 실제지출 - 결제금액 변경 적용
const updateActualAmount = (amount: string, id: number, peopleCnt: number) => {
  const newActualAmount =
    peopleCnt > 0
      ? calActualAmount(parseCurrency(amount), peopleCnt)
      : parseCurrency(amount);

  props.setNewExpenses((prev) =>
    prev.map((item) =>
      item.id === id ? { ...item, actualAmount: newActualAmount } : item
    )
  );
};
