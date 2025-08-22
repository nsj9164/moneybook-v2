import { parseCurrency } from "@/utils/format";
import { calActualAmount } from "./expenseCalc";

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
