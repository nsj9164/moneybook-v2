"use client";

import { useState, Fragment } from "react";
import {
  Download,
  Filter,
  Pencil,
  Plus,
  Search,
  Trash2,
  Receipt,
  ArrowRight,
  Upload,
  Settings,
  X,
  ChevronDown,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { motion } from "framer-motion";

// 샘플 데이터 - 확장된 형태로 수정
const expenses = [
  {
    id: 1,
    date: "2023-06-15",
    category: "식비",
    description: "스타벅스",
    paymentAmount: 5500,
    actualAmount: 5500,
    paymentMethod: "신용카드",
    memo: "오전 커피",
    isRecurring: false,
    isDifferentAmount: false,
  },
  {
    id: 2,
    date: "2023-06-14",
    category: "교통비",
    description: "지하철 충전",
    paymentAmount: 30000,
    actualAmount: 30000,
    paymentMethod: "현금",
    memo: "교통카드 충전",
    isRecurring: false,
    isDifferentAmount: false,
  },
  {
    id: 3,
    date: "2023-06-13",
    category: "쇼핑",
    description: "온라인 쇼핑",
    paymentAmount: 45000,
    actualAmount: 45000,
    paymentMethod: "신용카드",
    memo: "여름 옷",
    isRecurring: false,
    isDifferentAmount: false,
  },
  {
    id: 4,
    date: "2023-06-12",
    category: "식비",
    description: "식료품",
    paymentAmount: 32000,
    actualAmount: 16000,
    paymentMethod: "체크카드",
    memo: "친구와 반반",
    isRecurring: false,
    isDifferentAmount: true,
  },
  {
    id: 5,
    date: "2023-06-10",
    category: "여가",
    description: "영화 티켓",
    paymentAmount: 30000,
    actualAmount: 15000,
    paymentMethod: "신용카드",
    memo: "데이트 비용 반반",
    isRecurring: false,
    isDifferentAmount: true,
  },
  {
    id: 6,
    date: "2023-06-08",
    category: "주거비",
    description: "월세",
    paymentAmount: 500000,
    actualAmount: 500000,
    paymentMethod: "계좌이체",
    memo: "6월 월세",
    isRecurring: true,
    isDifferentAmount: false,
  },
  {
    id: 7,
    date: "2023-06-05",
    category: "통신비",
    description: "휴대폰 요금",
    paymentAmount: 55000,
    actualAmount: 55000,
    paymentMethod: "자동이체",
    memo: "6월 통신비",
    isRecurring: true,
    isDifferentAmount: false,
  },
  {
    id: 8,
    date: "2023-06-03",
    category: "식비",
    description: "외식",
    paymentAmount: 84000,
    actualAmount: 28000,
    paymentMethod: "신용카드",
    memo: "회식 3명 1/3",
    isRecurring: false,
    isDifferentAmount: true,
  },
  {
    id: 9,
    date: "2023-06-01",
    category: "의료/건강",
    description: "약국",
    paymentAmount: 12000,
    actualAmount: 12000,
    paymentMethod: "현금",
    memo: "감기약",
    isRecurring: false,
    isDifferentAmount: false,
  },
  {
    id: 10,
    date: "2023-05-28",
    category: "교육",
    description: "온라인 강의",
    paymentAmount: 99000,
    actualAmount: 99000,
    paymentMethod: "신용카드",
    memo: "프로그래밍 강의",
    isRecurring: true,
    isDifferentAmount: false,
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

// 컬럼 정의
const allColumns = [
  { id: "date", name: "날짜", visible: true },
  { id: "category", name: "카테고리", visible: true },
  { id: "description", name: "설명", visible: true },
  { id: "paymentAmount", name: "결제금액", visible: true },
  { id: "actualAmount", name: "실제지출", visible: true },
  { id: "paymentMethod", name: "결제수단", visible: true },
  { id: "memo", name: "메모", visible: true },
];

const Expenses = () => {
  // 금액 포맷팅
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("전체");
  const [showDifferentAmountOnly, setShowDifferentAmountOnly] = useState(false);
  const [showRecurringOnly, setShowRecurringOnly] = useState(false);
  const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);
  const [columns, setColumns] = useState(allColumns);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  // 기간 필터 상태 관리
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // 적용된 필터 개수 계산
  const activeFilterCount = [
    searchQuery ? 1 : 0,
    selectedCategory !== "전체" ? 1 : 0,
    selectedPaymentMethod !== "전체" ? 1 : 0,
    showDifferentAmountOnly ? 1 : 0,
    showRecurringOnly ? 1 : 0,
    startDate || endDate ? 1 : 0,
  ].reduce((sum, count) => sum + count, 0);

  // 개별 필터 제거 핸들러
  const removeFilter = (filterType: string) => {
    switch (filterType) {
      case "search":
        setSearchQuery("");
        break;
      case "category":
        setSelectedCategory("전체");
        break;
      case "paymentMethod":
        setSelectedPaymentMethod("전체");
        break;
      case "differentAmount":
        setShowDifferentAmountOnly(false);
        break;
      case "recurring":
        setShowRecurringOnly(false);
        break;
      case "dateRange":
        setStartDate("");
        setEndDate("");
        break;
    }
  };

  // 필터링된 지출 목록
  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch =
      expense.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expense.memo?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "전체" || expense.category === selectedCategory;
    const matchesPaymentMethod =
      selectedPaymentMethod === "전체" ||
      expense.paymentMethod === selectedPaymentMethod;
    const matchesDifferentAmount = showDifferentAmountOnly
      ? expense.isDifferentAmount
      : true;
    const matchesRecurring = showRecurringOnly ? expense.isRecurring : true;

    // 기간 필터링 추가
    const expenseDate = new Date(expense.date);
    const matchesStartDate = startDate
      ? expenseDate >= new Date(startDate)
      : true;
    const matchesEndDate = endDate ? expenseDate <= new Date(endDate) : true;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesPaymentMethod &&
      matchesDifferentAmount &&
      matchesRecurring &&
      matchesStartDate &&
      matchesEndDate
    );
  });

  // 체크박스 토글 핸들러
  const toggleItemSelection = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  // 전체 선택 토글 핸들러
  const toggleSelectAll = () => {
    if (selectedItems.length === filteredExpenses.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredExpenses.map((expense) => expense.id));
    }
  };

  // 필터 초기화 핸들러
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("전체");
    setSelectedPaymentMethod("전체");
    setShowDifferentAmountOnly(false);
    setShowRecurringOnly(false);
    setStartDate("");
    setEndDate("");
  };

  // 컬럼 가시성 토글 핸들러
  const toggleColumnVisibility = (columnId: string) => {
    setColumns(
      columns.map((col) =>
        col.id === columnId ? { ...col, visible: !col.visible } : col
      )
    );
  };

  // 컬럼 가시성 모달 열기
  const openColumnModal = () => {
    setIsColumnModalOpen(true);
  };

  // 컬럼 가시성 모달 닫기
  const closeColumnModal = () => {
    setIsColumnModalOpen(false);
  };

  // 보이는 컬럼 필터링
  const visibleColumns = columns.filter((col) => col.visible);

  // 합계 계산
  const totalPaymentAmount = filteredExpenses.reduce(
    (sum, expense) => sum + expense.paymentAmount,
    0
  );
  const totalActualAmount = filteredExpenses.reduce(
    (sum, expense) => sum + expense.actualAmount,
    0
  );

  return (
    <div className="flex-1 overflow-auto bg-gray-50 p-6">
      {/* 페이지 헤더 */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">지출 관리</h1>
            <p className="mt-1 text-sm text-gray-500">
              모든 지출 내역을 관리하고 분석하세요. 총 {expenses.length}개의
              지출 내역이 있습니다.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <input
                type="text"
                placeholder="지출 내역 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-64 rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm pl-10"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
              className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            >
              <Filter className="mr-1.5 -ml-0.5 h-4 w-4" />
              필터
              {activeFilterCount > 0 && (
                <span className="ml-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-xs font-medium text-emerald-700">
                  {activeFilterCount}
                </span>
              )}
            </button>
            <Link
              to="/expenses/add"
              className="inline-flex items-center rounded-md bg-emerald-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700"
            >
              <Plus className="mr-1.5 -ml-0.5 h-4 w-4" />
              지출 추가
            </Link>
          </div>
        </div>
      </div>

      {/* 필터 패널 */}
      {isFilterPanelOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6 rounded-lg border border-gray-200 bg-white shadow-sm"
        >
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">필터 설정</h2>
              <button
                type="button"
                onClick={() => setIsFilterPanelOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
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
                    placeholder="설명 또는 메모 검색..."
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
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
                <div className="relative">
                  <select
                    id="category"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm appearance-none pr-8"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="payment-method"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  결제 수단
                </label>
                <div className="relative">
                  <select
                    id="payment-method"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm appearance-none pr-8"
                    value={selectedPaymentMethod}
                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                  >
                    {paymentMethods.map((method) => (
                      <option key={method} value={method}>
                        {method}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
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

            {/* 추가 필터 옵션 */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex items-center">
                <input
                  id="different-amount"
                  name="different-amount"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  checked={showDifferentAmountOnly}
                  onChange={(e) => setShowDifferentAmountOnly(e.target.checked)}
                />
                <label
                  htmlFor="different-amount"
                  className="ml-2 block text-sm text-gray-700"
                >
                  결제금액과 실제지출이 다른 항목만 보기
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="recurring"
                  name="recurring"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  checked={showRecurringOnly}
                  onChange={(e) => setShowRecurringOnly(e.target.checked)}
                />
                <label
                  htmlFor="recurring"
                  className="ml-2 block text-sm text-gray-700"
                >
                  정기지출만 보기
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                onClick={openColumnModal}
              >
                <Settings className="mr-2 -ml-1 h-4 w-4" />
                표시 항목 설정
              </button>
              <button
                type="button"
                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                onClick={resetFilters}
              >
                <Filter className="mr-2 -ml-1 h-4 w-4" />
                필터 초기화
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* 적용된 필터 표시 영역 */}
      {activeFilterCount > 0 && (
        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-700">적용된 필터</h3>
            <button
              type="button"
              onClick={resetFilters}
              className="text-xs text-emerald-600 font-medium hover:text-emerald-700"
            >
              모두 초기화
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {searchQuery && (
              <div className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1.5 text-sm">
                <span className="font-medium text-gray-800 mr-1">검색:</span>
                <span className="text-gray-600">{searchQuery}</span>
                <button
                  type="button"
                  onClick={() => removeFilter("search")}
                  className="ml-2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}
            {selectedCategory !== "전체" && (
              <div className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1.5 text-sm">
                <span className="font-medium text-blue-700 mr-1">
                  카테고리:
                </span>
                <span className="text-blue-600">{selectedCategory}</span>
                <button
                  type="button"
                  onClick={() => removeFilter("category")}
                  className="ml-2 text-blue-400 hover:text-blue-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}
            {selectedPaymentMethod !== "전체" && (
              <div className="inline-flex items-center rounded-full bg-purple-50 px-3 py-1.5 text-sm">
                <span className="font-medium text-purple-700 mr-1">
                  결제수단:
                </span>
                <span className="text-purple-600">{selectedPaymentMethod}</span>
                <button
                  type="button"
                  onClick={() => removeFilter("paymentMethod")}
                  className="ml-2 text-purple-400 hover:text-purple-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}
            {showDifferentAmountOnly && (
              <div className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1.5 text-sm">
                <span className="text-amber-700">결제/실제금액 상이</span>
                <button
                  type="button"
                  onClick={() => removeFilter("differentAmount")}
                  className="ml-2 text-amber-400 hover:text-amber-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}
            {showRecurringOnly && (
              <div className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1.5 text-sm">
                <span className="text-emerald-700">정기지출</span>
                <button
                  type="button"
                  onClick={() => removeFilter("recurring")}
                  className="ml-2 text-emerald-400 hover:text-emerald-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}
            {(startDate || endDate) && (
              <div className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1.5 text-sm">
                <span className="font-medium text-indigo-700 mr-1">기간:</span>
                <span className="text-indigo-600">
                  {startDate || "처음"} ~ {endDate || "현재"}
                </span>
                <button
                  type="button"
                  onClick={() => removeFilter("dateRange")}
                  className="ml-2 text-indigo-400 hover:text-indigo-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 필터링 결과 요약 */}
      {filteredExpenses.length > 0 && activeFilterCount > 0 && (
        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5">
              <p className="text-sm text-gray-500">필터링된 지출</p>
              <div className="flex items-center justify-between mt-1">
                <h3 className="text-2xl font-bold text-gray-900">
                  {formatCurrency(
                    filteredExpenses.reduce(
                      (sum, expense) => sum + expense.actualAmount,
                      0
                    )
                  )}
                </h3>
                <span className="text-sm font-medium text-gray-500">
                  {filteredExpenses.length}건
                </span>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5">
              <p className="text-sm text-gray-500">평균 지출</p>
              <div className="flex items-center justify-between mt-1">
                <h3 className="text-2xl font-bold text-gray-900">
                  {formatCurrency(
                    filteredExpenses.length > 0
                      ? filteredExpenses.reduce(
                          (sum, expense) => sum + expense.actualAmount,
                          0
                        ) / filteredExpenses.length
                      : 0
                  )}
                </h3>
                <span className="text-sm font-medium text-gray-500">건당</span>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-5">
              <p className="text-sm text-gray-500">최대 지출</p>
              <div className="flex items-center justify-between mt-1">
                <h3 className="text-2xl font-bold text-gray-900">
                  {formatCurrency(
                    filteredExpenses.length > 0
                      ? Math.max(
                          ...filteredExpenses.map(
                            (expense) => expense.actualAmount
                          )
                        )
                      : 0
                  )}
                </h3>
                <span className="text-sm font-medium text-gray-500">
                  {filteredExpenses.length > 0
                    ? filteredExpenses.find(
                        (e) =>
                          e.actualAmount ===
                          Math.max(
                            ...filteredExpenses.map((exp) => exp.actualAmount)
                          )
                      )?.category
                    : ""}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 지출 목록 테이블 또는 빈 상태 */}
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="p-5 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">지출 내역</h2>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
              >
                <Download className="mr-1.5 -ml-0.5 h-4 w-4" />
                내보내기
              </button>
              <button
                type="button"
                className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                disabled={selectedItems.length === 0}
              >
                <Trash2 className="mr-1.5 -ml-0.5 h-4 w-4 text-red-500" />
                선택 삭제 ({selectedItems.length})
              </button>
            </div>
          </div>
        </div>

        <div className="p-5">
          {expenses.length === 0 ? (
            // 데이터 자체가 없는 경우 - 빈 상태 화면
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 mb-4">
                <Receipt className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                지출 내역이 없습니다
              </h3>
              <p className="text-sm text-gray-500 mb-6 max-w-md">
                아직 등록된 지출 내역이 없습니다. 지출을 추가하여 지출 관리를
                시작해보세요.
              </p>
              <Link
                to="/expenses/add"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors"
              >
                <Plus className="mr-2 -ml-1 h-4 w-4" />첫 지출 추가하기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <div className="mt-8 border-t border-gray-200 pt-6 w-full max-w-md">
                <h4 className="text-sm font-medium text-gray-900 mb-3">
                  다른 방법으로 시작하기
                </h4>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  >
                    <Download className="mr-2 -ml-1 h-4 w-4" />
                    템플릿 다운로드
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  >
                    <Upload className="mr-2 -ml-1 h-4 w-4" />
                    엑셀 파일 가져오기
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // 데이터가 있는 경우 - 테이블 표시 (검색 결과 있음/없음 모두 포함)
            <>
              {filteredExpenses.length > 0 ? (
                // 검색 결과가 있는 경우
                <div className="border rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="w-12 px-6 py-4 sm:w-16 sm:px-8"
                          >
                            <input
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                              checked={
                                selectedItems.length ===
                                  filteredExpenses.length &&
                                filteredExpenses.length > 0
                              }
                              onChange={toggleSelectAll}
                              disabled={filteredExpenses.length === 0}
                            />
                          </th>
                          {columns.find((col) => col.id === "date")
                            ?.visible && (
                            <th
                              scope="col"
                              className="px-6 py-4 text-left text-sm font-semibold text-gray-900"
                            >
                              날짜
                            </th>
                          )}
                          {columns.find((col) => col.id === "category")
                            ?.visible && (
                            <th
                              scope="col"
                              className="px-6 py-4 text-left text-sm font-semibold text-gray-900"
                            >
                              카테고리
                            </th>
                          )}
                          {columns.find((col) => col.id === "description")
                            ?.visible && (
                            <th
                              scope="col"
                              className="px-6 py-4 text-left text-sm font-semibold text-gray-900"
                            >
                              설명
                            </th>
                          )}
                          {columns.find((col) => col.id === "paymentAmount")
                            ?.visible && (
                            <th
                              scope="col"
                              className="px-6 py-4 text-right text-sm font-semibold text-gray-900"
                            >
                              결제금액
                            </th>
                          )}
                          {columns.find((col) => col.id === "actualAmount")
                            ?.visible && (
                            <th
                              scope="col"
                              className="px-6 py-4 text-right text-sm font-semibold text-gray-900"
                            >
                              실제지출
                            </th>
                          )}
                          {columns.find((col) => col.id === "paymentMethod")
                            ?.visible && (
                            <th
                              scope="col"
                              className="px-6 py-4 text-left text-sm font-semibold text-gray-900"
                            >
                              결제수단
                            </th>
                          )}
                          {columns.find((col) => col.id === "memo")
                            ?.visible && (
                            <th
                              scope="col"
                              className="px-6 py-4 text-left text-sm font-semibold text-gray-900"
                            >
                              메모
                            </th>
                          )}
                          <th
                            scope="col"
                            className="px-6 py-4 text-right text-sm font-semibold text-gray-900"
                          >
                            액션
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {filteredExpenses.map((expense) => (
                          <tr
                            key={expense.id}
                            className={`hover:bg-gray-50 ${
                              expense.isRecurring ? "bg-blue-50" : ""
                            } ${
                              expense.isDifferentAmount ? "bg-amber-50" : ""
                            }`}
                          >
                            <td className="w-12 px-6 py-4 sm:w-16 sm:px-8">
                              <input
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                checked={selectedItems.includes(expense.id)}
                                onChange={() => toggleItemSelection(expense.id)}
                              />
                            </td>
                            {columns.find((col) => col.id === "date")
                              ?.visible && (
                              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                {expense.date}
                              </td>
                            )}
                            {columns.find((col) => col.id === "category")
                              ?.visible && (
                              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                <span
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                                  ${
                                    expense.category === "식비"
                                      ? "bg-rose-100 text-rose-800"
                                      : expense.category === "교통비"
                                      ? "bg-blue-100 text-blue-800"
                                      : expense.category === "쇼핑"
                                      ? "bg-emerald-100 text-emerald-800"
                                      : expense.category === "여가"
                                      ? "bg-purple-100 text-purple-800"
                                      : "bg-amber-100 text-amber-800"
                                  }`}
                                >
                                  {expense.category}
                                </span>
                              </td>
                            )}
                            {columns.find((col) => col.id === "description")
                              ?.visible && (
                              <td className="px-6 py-4 text-sm text-gray-900">
                                {expense.description}
                              </td>
                            )}
                            {columns.find((col) => col.id === "paymentAmount")
                              ?.visible && (
                              <td className="whitespace-nowrap px-6 py-4 text-sm text-right font-medium">
                                {formatCurrency(expense.paymentAmount)}
                              </td>
                            )}
                            {columns.find((col) => col.id === "actualAmount")
                              ?.visible && (
                              <td className="whitespace-nowrap px-6 py-4 text-sm text-right font-medium">
                                {formatCurrency(expense.actualAmount)}
                              </td>
                            )}
                            {columns.find((col) => col.id === "paymentMethod")
                              ?.visible && (
                              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                {expense.paymentMethod}
                              </td>
                            )}
                            {columns.find((col) => col.id === "memo")
                              ?.visible && (
                              <td className="px-6 py-4 text-sm text-gray-500 max-w-[200px] truncate">
                                {expense.memo}
                              </td>
                            )}
                            <td className="whitespace-nowrap px-6 py-4 text-sm text-right">
                              <div className="flex justify-end space-x-2">
                                <button
                                  type="button"
                                  className="inline-flex items-center rounded-md border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                                >
                                  <Pencil className="mr-1 h-3 w-3" />
                                  수정
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      {filteredExpenses.length > 0 && (
                        <tfoot className="bg-gray-50">
                          <tr className="border-t-2 border-gray-300">
                            <th
                              colSpan={2}
                              scope="row"
                              className="px-6 py-4 text-left text-sm font-semibold text-gray-900"
                            >
                              합계
                            </th>
                            <th
                              colSpan={
                                columns.filter(
                                  (col) =>
                                    col.visible &&
                                    col.id !== "date" &&
                                    col.id !== "paymentAmount" &&
                                    col.id !== "actualAmount"
                                ).length
                              }
                              className="px-6 py-4 text-left text-sm font-semibold text-gray-900"
                            >
                              {filteredExpenses.length}건
                            </th>
                            {columns.find((col) => col.id === "paymentAmount")
                              ?.visible && (
                              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                                {formatCurrency(totalPaymentAmount)}
                              </th>
                            )}
                            {columns.find((col) => col.id === "actualAmount")
                              ?.visible && (
                              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                                {formatCurrency(totalActualAmount)}
                              </th>
                            )}
                            <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900"></th>
                          </tr>
                        </tfoot>
                      )}
                    </table>
                  </div>
                </div>
              ) : (
                // 검색 결과가 없는 경우
                <div className="flex flex-col items-center justify-center py-12 px-4 text-center bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-3">
                    <Search className="h-6 w-6 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    검색 결과가 없습니다
                  </h3>
                  <p className="text-sm text-gray-500 mb-3 max-w-md">
                    현재 적용된 필터와 일치하는 지출 내역을 찾을 수 없습니다.
                  </p>
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors"
                  >
                    <Filter className="mr-2 -ml-1 h-4 w-4" />
                    필터 초기화
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* 페이지네이션 */}
        {filteredExpenses.length > 0 && (
          <div className="border-t border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <p className="text-sm text-gray-700">
                  총{" "}
                  <span className="font-medium">{filteredExpenses.length}</span>{" "}
                  항목
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                >
                  이전
                </button>
                <button
                  type="button"
                  className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                >
                  다음
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 컬럼 설정 모달 */}
      <Transition appear show={isColumnModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeColumnModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    표시 항목 설정
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      테이블에 표시할 항목을 선택하세요.
                    </p>
                  </div>

                  <div className="mt-4 space-y-3">
                    {columns.map((column) => (
                      <div key={column.id} className="flex items-center">
                        <input
                          id={`column-${column.id}`}
                          name={`column-${column.id}`}
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                          checked={column.visible}
                          onChange={() => toggleColumnVisibility(column.id)}
                        />
                        <label
                          htmlFor={`column-${column.id}`}
                          className="ml-3 block text-sm font-medium text-gray-700"
                        >
                          {column.name}
                        </label>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                      onClick={closeColumnModal}
                    >
                      확인
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Expenses;
