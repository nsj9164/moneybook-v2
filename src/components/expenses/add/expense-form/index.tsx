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

  // calculate_1인당 금액
  const getSplitAmount = (peopleCnt: string, id: UUID) => {
    props.setNewExpenses((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const totalAmount = parseCurrency(item.amount);
          const splitAmount = Math.floor(totalAmount / Number(peopleCnt));
          return { ...item, actualAmount: String(splitAmount) };
        }
        return item;
      })
    );
  };

  const FormComponentProps = {
    ...props,
    handleUpdExpense,
    handleDelExpense,
    getSplitAmount,
  };

  return <FormComponent {...FormComponentProps} />;
};
