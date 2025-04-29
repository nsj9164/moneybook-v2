import { useMediaQuery } from "@/hooks/useMediaQuery";
import { ExpenseCardForm } from "./ExpenseCardForm";
import { ExpenseTableForm } from "./ExpenseTableForm";
import { expensesProps } from "./types";

export const ExpenseForm = (props: expensesProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const FormComponent = isMobile ? ExpenseCardForm : ExpenseTableForm;

  return <FormComponent {...props} />;
};
