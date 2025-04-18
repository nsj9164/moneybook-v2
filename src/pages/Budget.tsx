"use client";

import { useState } from "react";
import { Calendar, ChevronDown, Edit2, Plus, Trash2 } from "lucide-react";

// 샘플 데이터
const budgetCategories = [
  { id: 1, name: "식비", budget: 500000, spent: 450000 },
  { id: 2, name: "교통비", budget: 150000, spent: 120000 },
  { id: 3, name: "주거비", budget: 400000, spent: 350000 },
  { id: 4, name: "통신비", budget: 100000, spent: 55000 },
  { id: 5, name: "의료/건강", budget: 100000, spent: 12000 },
  { id: 6, name: "교육", budget: 200000, spent: 99000 },
  { id: 7, name: "쇼핑", budget: 200000, spent: 180000 },
  { id: 8, name: "여가", budget: 200000, spent: 150000 },
  { id: 9, name: "기타", budget: 150000, spent: 50000 },
];

const Budget = () => {
  const [selectedYear, setSelectedYear] = useState(2023);
  const [selectedMonth, setSelectedMonth] = useState(6);

  // 금액 포맷팅
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // 총 예산 및 지출 계산
  const totalBudget = budgetCategories.reduce(
    (sum, category) => sum + category.budget,
    0
  );
  const totalSpent = budgetCategories.reduce(
    (sum, category) => sum + category.spent,
    0
  );
  const remainingBudget = totalBudget - totalSpent;
  const budgetProgress = Math.round((totalSpent / totalBudget) * 100);

  return (
    <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-sm mt-6 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">
          예산 계획
        </h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-gray-400" />
            <div className="flex items-center">
              <select
                className="appearance-none rounded-md border border-gray-300 pl-3 pr-10 py-1 text-sm font-medium text-gray-700 focus:border-emerald-500 focus:outline-none focus:ring-emerald-500"
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              >
                {[2021, 2022, 2023, 2024].map((year) => (
                  <option key={year} value={year}>
                    {year}년
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none -ml-6 h-4 w-4 text-gray-400" />
            </div>
            <div className="flex items-center">
              <select
                className="appearance-none rounded-md border border-gray-300 pl-3 pr-10 py-1 text-sm font-medium text-gray-700 focus:border-emerald-500 focus:outline-none focus:ring-emerald-500"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                  <option key={month} value={month}>
                    {month}월
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none -ml-6 h-4 w-4 text-gray-400" />
            </div>
          </div>
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            <Plus className="mr-2 -ml-1 h-4 w-4" />
            예산 추가
          </button>
        </div>
      </div>

      {/* 예산 요약 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-gray-500">총 예산</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">
            {formatCurrency(totalBudget)}
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-gray-500">사용 금액</div>
          <div className="text-2xl font-bold text-red-600 mt-1">
            {formatCurrency(totalSpent)}
          </div>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-gray-500">남은 예산</div>
          <div className="text-2xl font-bold text-emerald-600 mt-1">
            {formatCurrency(remainingBudget)}
          </div>
        </div>
      </div>

      {/* 전체 예산 진행 상황 */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <div className="flex justify-between mb-2">
          <h2 className="text-lg font-semibold text-gray-900">
            전체 예산 진행 상황
          </h2>
          <div className="text-sm font-medium text-gray-700">
            {budgetProgress}% 사용 ({formatCurrency(totalSpent)} /{" "}
            {formatCurrency(totalBudget)})
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className={`h-4 rounded-full ${
              budgetProgress > 100 ? "bg-red-600" : "bg-emerald-600"
            }`}
            style={{ width: `${Math.min(budgetProgress, 100)}%` }}
          ></div>
        </div>
      </div>

      {/* 카테고리별 예산 */}
      <div className="bg-white mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          카테고리별 예산
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >
                  카테고리
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  예산
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  사용 금액
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  남은 금액
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  진행 상황
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">편집</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {budgetCategories.map((category) => {
                const progress = Math.round(
                  (category.spent / category.budget) * 100
                );
                return (
                  <tr key={category.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      {category.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {formatCurrency(category.budget)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {formatCurrency(category.spent)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {formatCurrency(category.budget - category.spent)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                          <div
                            className={`h-2.5 rounded-full ${
                              progress > 100 ? "bg-red-600" : "bg-emerald-600"
                            }`}
                            style={{ width: `${Math.min(progress, 100)}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium">{progress}%</span>
                      </div>
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          type="button"
                          className="text-emerald-600 hover:text-emerald-900"
                        >
                          <Edit2 className="h-4 w-4" />
                          <span className="sr-only">{category.name} 편집</span>
                        </button>
                        <button
                          type="button"
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">{category.name} 삭제</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 예산 조언 */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">예산 조언</h2>
        <div className="space-y-4">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-yellow-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  쇼핑 카테고리가 예산의 90%를 사용했습니다. 이번 달 지출을
                  조절하는 것이 좋겠습니다.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  식비 카테고리가 예산을 초과했습니다. 다음 달 예산을 조정하거나
                  지출을 줄이는 것이 좋겠습니다.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-green-50 border-l-4 border-green-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-green-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-700">
                  의료/건강 카테고리는 예산의 12%만 사용했습니다. 잘 관리되고
                  있습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Budget;
