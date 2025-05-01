import { useMediaQuery } from "@/hooks/useMediaQuery";
import { IExpense } from "@/types/expense-types";
import { ExpenseCardForm } from "./ExpenseCardForm";
import { ExpenseTableForm } from "./ExpenseTableForm";
import { expensesProps } from "./types";

export const ExpenseForm = (props: expensesProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const FormComponent = isMobile ? ExpenseCardForm : ExpenseTableForm;

  const handleUpdExpense = (
    value: IExpense[keyof IExpense],
    id: number,
    key: keyof IExpense
  ) => {
    props.setNewExpenses((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [key]: value, isModified: true } : item
      )
    );
  };

  const handleDelExpense = (id: number) => {
    props.setNewExpenses((prev) => prev.filter((item) => item.id !== id));
  };

  const getSplitAmount = (peopleCnt: number, id: number) => {
    props.newExpenses.map((item) => {
      if (item.id === id) {
        const totalAmount = Number(item.amount);
        const splitAmount = Math.floor(totalAmount / peopleCnt);
        return splitAmount;
      }
    });
  };

  const FormComponentProps = {
    ...props,
    handleUpdExpense,
    handleDelExpense,
    getSplitAmount,
  };

  return <FormComponent {...FormComponentProps} />;
};
