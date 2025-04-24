import { formatCurrency } from "@/utils/format";
import { Trash2 } from "lucide-react";
import { IExpenses } from ".";

const categories = [
  "식비",
  "교통비",
  "주거비",
  "통신비",
  "의료/건강",
  "교육",
  "쇼핑",
  "여가",
  "기타",
];
const paymentMethods = [
  "신용카드",
  "체크카드",
  "현금",
  "계좌이체",
  "자동이체",
  "기타",
];

interface Props {
  newExpenses: IExpenses[];
  handleDelNewExpense: (id: number) => void;
}

const AddExpenseDesktop = ({ newExpenses, handleDelNewExpense }: Props) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th className="w-[12%] text-sm font-semibold text-gray-900 px-4 py-3 text-left">
              날짜
            </th>
            <th className="w-[12%] text-sm font-semibold text-gray-900 px-4 py-3 text-left">
              카테고리
            </th>
            <th className="w-[20%] text-sm font-semibold text-gray-900 px-4 py-3 text-left">
              항목
            </th>
            <th className="w-[12%] text-sm font-semibold text-gray-900 px-4 py-3 text-left">
              결제금액
            </th>
            <th className="w-[12%] text-sm font-semibold text-gray-900 px-4 py-3 text-left">
              실제지출
            </th>
            <th className="w-[12%] text-sm font-semibold text-gray-900 px-4 py-3 text-left">
              결제수단
            </th>
            <th className="w-[15%] text-sm font-semibold text-gray-900 px-4 py-3 text-left">
              메모
            </th>
            <th className="w-[5%] text-sm font-semibold text-gray-900 px-4 py-3 text-left">
              삭제
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {newExpenses.map((expense) => (
            <>
              <tr key={expense.id}>
                <td className="px-4 py-4 text-sm text-gray-700">
                  <input
                    type="date"
                    value={expense.date}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                  />
                </td>
                <td className="px-4 py-4 text-sm text-gray-700">
                  <select
                    value={expense.categoryId}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-4 text-sm text-gray-700">
                  <input
                    type="text"
                    value={expense.itemName}
                    placeholder="지출 항목을 입력하세요"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                  />
                </td>
                <td className="px-4 py-4 text-sm text-gray-700">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">₩</span>
                    </div>
                    <input
                      type="text"
                      value={formatCurrency(Number(expense.amount))}
                      className="w-full pl-7 pr-3 rounded-md border-gray-300 shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                    />
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-gray-700 align-top">
                  <div className="flex flex-col gap-1">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">₩</span>
                      </div>
                      <input
                        type="text"
                        value={formatCurrency(Number(expense.actualAmount))}
                        disabled={!expense.isDifferentAmount}
                        className={`w-full pl-7 pr-3 rounded-md border-gray-300 shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm ${
                          !expense.isDifferentAmount ? "bg-gray-100" : ""
                        }`}
                      />
                    </div>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={expense.isDifferentAmount}
                        id={`checkbox-${expense.id}`}
                        className="h-4 w-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                      />
                      <span className="ml-2 text-xs text-gray-500">
                        실제 지출 다름
                      </span>
                    </label>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-gray-700">
                  <select
                    value={expense.paymentMethodId}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                  >
                    {paymentMethods.map((method) => (
                      <option key={method} value={method}>
                        {method}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-4 text-sm text-gray-700">
                  <input
                    type="text"
                    value={expense.note}
                    placeholder="메모"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                  />
                </td>
                <td className="px-4 py-4 text-sm text-right">
                  <button
                    onClick={() => handleDelNewExpense(expense.id)}
                    type="button"
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-5 w-5" />
                    <span className="sr-only">삭제</span>
                  </button>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddExpenseDesktop;
