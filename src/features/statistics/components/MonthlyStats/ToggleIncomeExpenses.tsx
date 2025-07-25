import { ToggleLeft, ToggleRight } from "lucide-react";

interface ToggleIncomeExpensesProps {
  showIncome: boolean;
  toggleIncomeExpenses: () => void;
}

export const ToggleIncomeExpenses = ({
  showIncome,
  toggleIncomeExpenses,
}: ToggleIncomeExpensesProps) => {
  return (
    <div className="flex items-center space-x-3">
      <button
        onClick={toggleIncomeExpenses}
        className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900"
      >
        {showIncome ? (
          <>
            <ToggleRight className="w-5 h-5 text-emerald-600 mr-2" />
            수입 보기
          </>
        ) : (
          <>
            <ToggleLeft className="w-5 h-5 text-gray-400 mr-2" />
            지출 보기
          </>
        )}
      </button>
    </div>
  );
};
