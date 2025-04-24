import { useMediaQuery } from "@/hooks/useMediaQuery";
import { ExpenseCardForm } from "./ExpenseCardForm";
import { ExpenseTableForm } from "./ExpenseTableForm";

export const ExpenseForm = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return isMobile ? <ExpenseCardForm /> : <ExpenseTableForm />;
};
