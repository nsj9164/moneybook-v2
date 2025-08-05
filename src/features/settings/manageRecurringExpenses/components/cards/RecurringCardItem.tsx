import { RecurringDisplay } from "@/types";
import { formatCurrency } from "@/utils/format";
import { format } from "date-fns";
import { Calendar, CreditCard, Pencil, Trash2 } from "lucide-react";

interface RecurringCardItemProps {
  expense: RecurringDisplay;
  openModal: (expense: RecurringDisplay) => void;
  onDelete: (id: number) => void;
}

export const RecurringCardItem = ({
  expense,
  openModal,
  onDelete,
}: RecurringCardItemProps) => {
  return (
    <div
      key={expense.id}
      className={`rounded-lg border ${
        expense.isActive ? "border-gray-200" : "border-gray-200 bg-gray-50"
      } shadow-sm p-4 hover:shadow-md transition-shadow`}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center">
          <div
            className="h-8 w-8 rounded-full flex items-center justify-center mr-3"
            style={{
              backgroundColor: expense.categoryColor,
            }}
          >
            <span className="text-white text-sm">{expense.categoryEmoji}</span>
          </div>
          <div>
            <h3 className="text-base font-medium text-gray-900">
              {expense.name}
            </h3>
            <p className="text-sm text-gray-500">{expense.categoryName}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold text-gray-900">
            {formatCurrency(expense.amount)}
          </p>

          <p className="text-xs text-gray-500">{expense.cycleLabel}</p>
        </div>
      </div>

      <div className="flex items-center text-sm text-gray-500 mb-3">
        <Calendar className="h-4 w-4 mr-1" />
        <span>
          {`매월 ${expense.paymentDay}일
                    ${
                      expense.billingEndDate
                        ? ` (${format(
                            expense.billingEndDate,
                            "yyyy-MM-dd"
                          )}까지)`
                        : ""
                    }`}
        </span>
      </div>

      <div className="flex items-center text-sm text-gray-500 mb-3">
        <CreditCard className="h-4 w-4 mr-1" />
        <span>
          {expense.paymentMethodEmoji} {expense.paymentMethodName}
        </span>
      </div>

      {expense.note && (
        <p className="text-sm text-gray-600 mb-3">{expense.note}</p>
      )}

      <div className="flex justify-between items-center mt-2">
        <div>
          <button
            // onClick={() => handleToggleActive(expense.id)}
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
              expense.isActive
                ? "bg-emerald-100 text-emerald-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {expense.isActive ? "활성화됨" : "비활성화됨"}
          </button>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => openModal(expense)}
            className="text-emerald-600 hover:text-emerald-900"
          >
            <Pencil className="h-4 w-4" />
            <span className="sr-only">편집</span>
          </button>
          <button
            onClick={() => onDelete(expense.id)}
            className="text-red-600 hover:text-red-900"
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">삭제</span>
          </button>
        </div>
      </div>
    </div>
  );
};
