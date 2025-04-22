import { ExpensesFilter } from "./ExpensesFilter";
import { ExpensesFooter } from "./ExpensesFooter";
import { ExpensesHeader } from "./ExpensesHeader";
import { ExpensesRow } from "./ExpensesRow";

const Expenses = () => {
  return (
    <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-sm mt-6 mb-6">
      <ExpensesHeader />
      <ExpensesFilter />
      <ExpensesRow />
      <ExpensesFooter />
    </div>
  );
};

export default Expenses;
