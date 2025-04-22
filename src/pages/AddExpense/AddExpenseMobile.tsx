import { formatCurrency } from "@/utils/format";
import { Plus, X } from "lucide-react";

// 카테고리 및 결제 수단 데이터 (정적 데이터)
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

// 샘플 데이터 (정적 데이터)
const sampleExpenses = [
  {
    id: "1",
    date: "2023-06-15",
    category: "식비",
    title: "점심 식사",
    paymentAmount: "15000",
    actualAmount: "15000",
    paymentMethod: "신용카드",
    memo: "회사 근처 식당",
    isDifferentAmount: false,
    numberOfPeople: "1",
  },
  {
    id: "2",
    date: "2023-06-15",
    category: "교통비",
    title: "택시비",
    paymentAmount: "12000",
    actualAmount: "6000",
    paymentMethod: "신용카드",
    memo: "회식 후 귀가",
    isDifferentAmount: true,
    numberOfPeople: "2",
  },
];

const AddExpenseMobile = () => {
  const expenses = sampleExpenses;
  return (
    <div className="space-y-4">
      {expenses.map((expense, index) => (
        <div key={expense.id} className="bg-gray-50 p-4 rounded-lg relative">
          <div className="absolute top-2 right-2">
            <button type="button" className="text-gray-400 hover:text-red-600">
              <X className="h-5 w-5" />
              <span className="sr-only">삭제</span>
            </button>
          </div>
          <h3 className="text-sm font-medium text-gray-500 mb-3">
            항목 #{index + 1}
          </h3>
          <div className="space-y-3">
            <div>
              <label
                htmlFor={`date-${expense.id}`}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                날짜
              </label>
              <input
                type="date"
                id={`date-${expense.id}`}
                value={expense.date}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor={`category-${expense.id}`}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                카테고리
              </label>
              <select
                id={`category-${expense.id}`}
                value={expense.category}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor={`title-${expense.id}`}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                항목
              </label>
              <input
                type="text"
                id={`title-${expense.id}`}
                placeholder="지출 항목을 입력하세요"
                value={expense.title}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor={`payment-amount-${expense.id}`}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                결제금액
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-gray-500 sm:text-sm">₩</span>
                </div>
                <input
                  type="text"
                  id={`payment-amount-${expense.id}`}
                  placeholder="0"
                  value={formatCurrency(Number(expense.paymentAmount))}
                  className="block w-full rounded-md border-gray-300 pl-7 pr-3 focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor={`actual-amount-${expense.id}`}
                  className="block text-sm font-medium text-gray-700"
                >
                  실제지출
                </label>
                <div className="flex items-center">
                  <input
                    id={`different-amount-mobile-${expense.id}`}
                    type="checkbox"
                    checked={expense.isDifferentAmount}
                    className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <label
                    htmlFor={`different-amount-mobile-${expense.id}`}
                    className="ml-2 text-xs text-gray-500"
                  >
                    실제 지출 다름
                  </label>
                </div>
              </div>
              <div className="relative rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-gray-500 sm:text-sm">₩</span>
                </div>
                <input
                  type="text"
                  id={`actual-amount-${expense.id}`}
                  placeholder="0"
                  value={formatCurrency(Number(expense.actualAmount))}
                  disabled={!expense.isDifferentAmount}
                  className={`block w-full rounded-md border-gray-300 pl-7 pr-3 focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm ${
                    !expense.isDifferentAmount ? "bg-gray-100" : ""
                  }`}
                />
              </div>
              {expense.isDifferentAmount && (
                <div className="mt-2 p-2 bg-emerald-50 rounded-md border border-emerald-100">
                  <div className="flex items-center mb-1">
                    <span className="text-xs font-medium text-emerald-700 mr-2">
                      인원 수:
                    </span>
                    <input
                      type="number"
                      min="1"
                      value={expense.numberOfPeople}
                      className="block w-16 rounded-md border-emerald-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 text-xs"
                    />
                    <span className="text-xs text-emerald-700 ml-1">명</span>
                  </div>
                  <div className="flex justify-between text-xs text-emerald-700">
                    <span>
                      1인당: {formatCurrency(Number(expense.actualAmount))}
                    </span>
                    <span>
                      총액: {formatCurrency(Number(expense.paymentAmount))}
                    </span>
                  </div>
                  <div className="text-xs text-emerald-600 mt-1">
                    * 인원 수 변경 시 자동 계산됩니다. 필요시 직접 수정
                    가능합니다.
                  </div>
                </div>
              )}
            </div>
            <div>
              <label
                htmlFor={`payment-method-${expense.id}`}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                결제수단
              </label>
              <select
                id={`payment-method-${expense.id}`}
                value={expense.paymentMethod}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
              >
                {paymentMethods.map((method) => (
                  <option key={method} value={method}>
                    {method}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor={`memo-${expense.id}`}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                메모
              </label>
              <textarea
                id={`memo-${expense.id}`}
                placeholder="추가 정보를 입력하세요"
                value={expense.memo}
                rows={2}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
      ))}
      <button
        type="button"
        className="w-full flex items-center justify-center py-3 border-2 border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:text-emerald-600 hover:border-emerald-300 transition-colors"
      >
        <Plus className="mr-2 h-4 w-4" />새 항목 추가
      </button>
    </div>
  );
};

export default AddExpenseMobile;
