"use client";

import { useState } from "react";
import { Download, Filter, Plus, Search, Trash2 } from "lucide-react";

// 샘플 데이터
const expenses = [
  {
    id: 1,
    date: "2023-06-15",
    category: "식비",
    description: "스타벅스",
    amount: 5500,
    paymentMethod: "신용카드",
  },
  {
    id: 2,
    date: "2023-06-14",
    category: "교통비",
    description: "지하철 충전",
    amount: 30000,
    paymentMethod: "현금",
  },
  {
    id: 3,
    date: "2023-06-13",
    category: "쇼핑",
    description: "온라인 쇼핑",
    amount: 45000,
    paymentMethod: "신용카드",
  },
  {
    id: 4,
    date: "2023-06-12",
    category: "식비",
    description: "식료품",
    amount: 32000,
    paymentMethod: "체크카드",
  },
  {
    id: 5,
    date: "2023-06-10",
    category: "여가",
    description: "영화 티켓",
    amount: 15000,
    paymentMethod: "신용카드",
  },
  {
    id: 6,
    date: "2023-06-08",
    category: "주거비",
    description: "월세",
    amount: 500000,
    paymentMethod: "계좌이체",
  },
  {
    id: 7,
    date: "2023-06-05",
    category: "통신비",
    description: "휴대폰 요금",
    amount: 55000,
    paymentMethod: "자동이체",
  },
  {
    id: 8,
    date: "2023-06-03",
    category: "식비",
    description: "외식",
    amount: 28000,
    paymentMethod: "신용카드",
  },
  {
    id: 9,
    date: "2023-06-01",
    category: "의료/건강",
    description: "약국",
    amount: 12000,
    paymentMethod: "현금",
  },
  {
    id: 10,
    date: "2023-05-28",
    category: "교육",
    description: "온라인 강의",
    amount: 99000,
    paymentMethod: "신용카드",
  },
];

const categories = [
  "전체",
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
  "전체",
  "신용카드",
  "체크카드",
  "현금",
  "계좌이체",
  "자동이체",
  "기타",
];

const Expenses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("전체");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  // 필터링된 지출 목록
  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch = expense.description
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "전체" || expense.category === selectedCategory;
    const matchesPaymentMethod =
      selectedPaymentMethod === "전체" ||
      expense.paymentMethod === selectedPaymentMethod;
    const matchesStartDate = !startDate || expense.date >= startDate;
    const matchesEndDate = !endDate || expense.date <= endDate;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesPaymentMethod &&
      matchesStartDate &&
      matchesEndDate
    );
  });

  // 선택된 항목 토글
  const toggleItemSelection = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  // 모든 항목 선택/해제
  const toggleSelectAll = () => {
    if (selectedItems.length === filteredExpenses.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredExpenses.map((expense) => expense.id));
    }
  };

  // 금액 포맷팅
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-sm mt-6 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">
          지출 관리
        </h1>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors"
          >
            <Plus className="mr-2 -ml-1 h-4 w-4" />
            지출 추가
          </button>
          {selectedItems.length > 0 && (
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-red-600 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
            >
              <Trash2 className="mr-2 -ml-1 h-4 w-4" />
              선택 삭제 ({selectedItems.length})
            </button>
          )}
        </div>
      </div>

      {/* 검색 및 필터 */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <label
              htmlFor="search"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              검색
            </label>
            <div className="relative">
              <input
                type="text"
                id="search"
                placeholder="설명 검색..."
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              카테고리
            </label>
            <select
              id="category"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
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
              htmlFor="payment-method"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              결제 수단
            </label>
            <select
              id="payment-method"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
              value={selectedPaymentMethod}
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
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
              htmlFor="date-range"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              기간
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="date"
                id="start-date"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <span className="text-gray-500">~</span>
              <input
                type="date"
                id="end-date"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            <Filter className="mr-2 -ml-1 h-4 w-4" />
            필터 초기화
          </button>
        </div>
      </div>

      {/* 지출 목록 테이블 */}
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5 rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="relative w-12 px-6 sm:w-16 sm:px-8"
                  >
                    <input
                      type="checkbox"
                      className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      checked={
                        filteredExpenses.length > 0 &&
                        selectedItems.length === filteredExpenses.length
                      }
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    날짜
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    카테고리
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    설명
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    결제 수단
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900"
                  >
                    금액
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {filteredExpenses.map((expense) => (
                  <tr
                    key={expense.id}
                    className={
                      selectedItems.includes(expense.id) ? "bg-emerald-50" : ""
                    }
                  >
                    <td className="relative w-12 px-6 sm:w-16 sm:px-8">
                      <input
                        type="checkbox"
                        className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                        checked={selectedItems.includes(expense.id)}
                        onChange={() => toggleItemSelection(expense.id)}
                      />
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {expense.date}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {expense.category}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-900">
                      {expense.description}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {expense.paymentMethod}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-right font-medium">
                      {formatCurrency(expense.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-gray-300">
                  <th
                    colSpan={5}
                    scope="row"
                    className="hidden pl-6 pr-3 pt-4 text-right text-sm font-semibold text-gray-900 sm:table-cell"
                  >
                    합계
                  </th>
                  <th
                    scope="row"
                    className="pl-6 pr-3 pt-4 text-left text-sm font-semibold text-gray-900 sm:hidden"
                  >
                    합계
                  </th>
                  <td className="pl-3 pr-6 pt-4 text-right text-sm font-semibold text-gray-900">
                    {formatCurrency(
                      filteredExpenses.reduce(
                        (sum, expense) => sum + expense.amount,
                        0
                      )
                    )}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>

      {/* 페이지네이션 및 내보내기 */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center">
          <p className="text-sm text-gray-700">
            총 <span className="font-medium">{filteredExpenses.length}</span>{" "}
            항목
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            type="button"
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            <Download className="mr-2 -ml-1 h-4 w-4" />
            내보내기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Expenses;
