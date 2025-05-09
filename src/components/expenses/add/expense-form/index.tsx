import { useMediaQuery } from "@/hooks/useMediaQuery";
import { IExpense, UUID } from "@/types/expense-types";
import { parseCurrency } from "@/utils/format";
import { ExpenseCardForm } from "./ExpenseCardForm";
import { ExpenseTableForm } from "./ExpenseTableForm";
import { ExpensesProps } from "./types/types";

export const ExpenseForm = (props: ExpensesProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const FormComponent = isMobile ? ExpenseCardForm : ExpenseTableForm;

  // newExpenses update
  const handleUpdExpense = (
    value: IExpense[keyof IExpense],
    id: UUID,
    key: keyof IExpense
  ) => {
    props.setNewExpenses((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [key]: value, isModified: true } : item
      )
    );
  };

  // newExpenses delete
  const handleDelExpense = (id: UUID) => {
    props.setNewExpenses((prev) => prev.filter((item) => item.id !== id));
  };

  // calculate_실제지출
  const calActualAmount = (amount: number, peopleCnt: number) => {
    return Math.floor(amount / peopleCnt);
  };

  // return calculate_실제지출
  const getSplitAmount = (peopleCnt: number, id: UUID) => {
    props.setNewExpenses((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const splitAmount = calActualAmount(
            parseCurrency(item.amount),
            peopleCnt
          );
          return {
            ...item,
            actualAmount: String(splitAmount),
            numberOfPeople: peopleCnt,
          };
        }
        return item;
      })
    );
  };

  // 실제지출 - 결제금액 변경 적용
  const updateActualAmount = (amount: string, id: UUID, peopleCnt: number) => {
    const newActualAmount =
      peopleCnt > 0
        ? calActualAmount(parseCurrency(amount), peopleCnt)
        : parseCurrency(amount);

    console.log(
      "peopleCnt:::",
      peopleCnt,
      "////newActualAmount:::",
      newActualAmount
    );

    props.setNewExpenses((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, actualAmount: String(newActualAmount) }
          : item
      )
    );
  };

  const FormComponentProps = {
    ...props,
    handleUpdExpense,
    handleDelExpense,
    getSplitAmount,
    updateActualAmount,
  };

  return <FormComponent {...FormComponentProps} />;
};
