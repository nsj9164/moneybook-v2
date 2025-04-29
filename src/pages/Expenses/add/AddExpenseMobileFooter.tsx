import { Save } from "lucide-react";

export const AddExpenseMobileFooter = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
      <button
        type="button"
        className="w-full inline-flex items-center justify-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors"
      >
        <Save className="mr-2 -ml-1 h-4 w-4" />
        모두 저장 ({newExpenses.length}개)
      </button>
    </div>
  );
};
