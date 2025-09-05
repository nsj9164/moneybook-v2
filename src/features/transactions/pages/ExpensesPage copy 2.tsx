"use client";

import { useState } from "react";
import {
  Download,
  Filter,
  Plus,
  Search,
  Trash2,
  Receipt,
  ArrowRight,
  Upload,
  Settings,
  X,
  ChevronDown,
  Edit,
  TrendingUp,
  TrendingDown,
  DollarSign,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// 샘플 데이터 - 지출과 수입 포함
const allTransactions = [
  {
    id: 1,
    date: "2023-06-15",
    type: "expense" as const,
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
    type: "expense" as const,
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
    type: "income" as const,
    category: "급여",
    description: "월급",
    paymentAmount: 3000000,
    actualAmount: 3000000,
    paymentMethod: "계좌이체",
    memo: "6월 급여",
    isRecurring: true,
    isDifferentAmount: false,
  },
  {
    id: 4,
    date: "2023-06-12",
    type: "expense" as const,
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
    type: "income" as const,
    category: "부수입",
    description: "프리랜서 작업",
    paymentAmount: 500000,
    actualAmount: 500000,
    paymentMethod: "계좌이체",
    memo: "웹사이트 제작",
    isRecurring: false,
    isDifferentAmount: false,
  },
  // 더보기 기능 테스트를 위한 추가 데이터
  ...Array.from({ length: 50 }, (_, i) => ({
    id: i + 6,
    date: `2023-06-${String(Math.floor(Math.random() * 28) + 1).padStart(
      2,
      "0"
    )}`,
    type: Math.random() > 0.7 ? ("income" as const) : ("expense" as const),
    category: Math.random() > 0.5 ? "식비" : "교통비",
    description: `거래 ${i + 6}`,
    paymentAmount: Math.floor(Math.random() * 100000) + 1000,
    actualAmount: Math.floor(Math.random() * 100000) + 1000,
    paymentMethod: ["신용카드", "체크카드", "현금"][
      Math.floor(Math.random() * 3)
    ],
    memo: `메모 ${i + 6}`,
    isRecurring: Math.random() > 0.8,
    isDifferentAmount: Math.random() > 0.9,
  })),
];

const expenseCategories = [
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
const incomeCategories = ["전체", "급여", "부수입", "투자수익", "기타수입"];

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
  { id: "type", name: "구분", visible: true },
  { id: "category", name: "카테고리", visible: true },
  { id: "description", name: "설명", visible: true },
  { id: "paymentAmount", name: "결제금액", visible: true },
  { id: "actualAmount", name: "실제금액", visible: true },
  { id: "paymentMethod", name: "결제수단", visible: true },
  { id: "memo", name: "메모", visible: true },
];

const ITEMS_PER_PAGE = 20;

const Expenses = () => {
  // 금액 포맷팅
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const [selectedTab, setSelectedTab] = useState<"all" | "expense" | "income">(
    "all"
  );
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("전체");
  const [showDifferentAmountOnly, setShowDifferentAmountOnly] = useState(false);
  const [showRecurringOnly, setShowRecurringOnly] = useState(false);
  const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);
  const [columns, setColumns] = useState(allColumns);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [displayedItemsCount, setDisplayedItemsCount] =
    useState(ITEMS_PER_PAGE);

  // 기간 필터 상태 관리
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // 현재 탭에 따른 카테고리 목록
  const currentCategories =
    selectedTab === "income" ? incomeCategories : expenseCategories;

  // 적용된 필터 개수 계산
  const activeFilterCount = [
    searchQuery ? 1 : 0,
    selectedCategory !== "전체" ? 1 : 0,
    selectedPaymentMethod !== "전체" ? 1 : 0,
    showDifferentAmountOnly ? 1 : 0,
    showRecurringOnly ? 1 : 0,
    startDate || endDate ? 1 : 0,
    selectedTab !== "all" ? 1 : 0,
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
      case "tab":
        setSelectedTab("all");
        break;
    }
  };

  // 필터링된 거래 목록
  const filteredTransactions = allTransactions.filter((transaction) => {
    const matchesSearch =
      transaction.description
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      transaction.memo?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab =
      selectedTab === "all" || transaction.type === selectedTab;
    const matchesCategory =
      selectedCategory === "전체" || transaction.category === selectedCategory;
    const matchesPaymentMethod =
      selectedPaymentMethod === "전체" ||
      transaction.paymentMethod === selectedPaymentMethod;
    const matchesDifferentAmount = showDifferentAmountOnly
      ? transaction.isDifferentAmount
      : true;
    const matchesRecurring = showRecurringOnly ? transaction.isRecurring : true;

    // 기간 필터링 추가
    const transactionDate = new Date(transaction.date);
    const matchesStartDate = startDate
      ? transactionDate >= new Date(startDate)
      : true;
    const matchesEndDate = endDate
      ? transactionDate <= new Date(endDate)
      : true;

    return (
      matchesSearch &&
      matchesTab &&
      matchesCategory &&
      matchesPaymentMethod &&
      matchesDifferentAmount &&
      matchesRecurring &&
      matchesStartDate &&
      matchesEndDate
    );
  });

  // 현재 표시할 거래 목록
  const displayedTransactions = filteredTransactions.slice(
    0,
    displayedItemsCount
  );

  // 더보기 핸들러
  const handleLoadMore = () => {
    setDisplayedItemsCount((prev) =>
      Math.min(prev + ITEMS_PER_PAGE, filteredTransactions.length)
    );
  };

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
    if (selectedItems.length === displayedTransactions.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(
        displayedTransactions.map((transaction) => transaction.id)
      );
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
    setSelectedTab("all");
    setDisplayedItemsCount(ITEMS_PER_PAGE);
  };

  // 컬럼 가시성 토글 핸들러
  const toggleColumnVisibility = (columnId: string) => {
    setColumns(
      columns.map((col) =>
        col.id === columnId ? { ...col, visible: !col.visible } : col
      )
    );
  };

  // 합계 계산
  const totalPaymentAmount = displayedTransactions.reduce(
    (sum, transaction) => sum + transaction.paymentAmount,
    0
  );
  const totalActualAmount = displayedTransactions.reduce(
    (sum, transaction) => sum + transaction.actualAmount,
    0
  );

  // 탭별 통계 계산
  const expenseTotal = filteredTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.actualAmount, 0);
  const incomeTotal = filteredTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.actualAmount, 0);

  return (
    <div className="h-full">
      {/* 페이지 헤더 */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">지출 관리</h1>
          <p className="mt-1 text-sm text-gray-500">
            모든 지출과 수입 내역을 관리하고 분석하세요. 총{" "}
            {allTransactions.length}개의 거래 내역이 있습니다.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <input
              type="text"
              placeholder="거래 내역 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-64 rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm pl-10"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsFilterPanelOpen(!isFilterPanelOpen)}
            className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
          >
            <Filter className="mr-2 -ml-1 h-4 w-4" />
            필터
            {activeFilterCount > 0 && (
              <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-xs font-medium text-emerald-700">
                {activeFilterCount}
              </span>
            )}
          </button>
          <Link
            to="/transactions/add"
            className="inline-flex items-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700"
          >
            <Plus className="mr-2 -ml-1 h-4 w-4" />
            거래 추가
          </Link>
        </div>
      </div>

      {/* 메인 콘텐츠 영역 */}
      <div className="p-6 space-y-6">
        {/* 탭 및 요약 통계 */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setSelectedTab("all")}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    selectedTab === "all"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  전체
                </button>
                <button
                  onClick={() => setSelectedTab("expense")}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    selectedTab === "expense"
                      ? "bg-white text-red-700 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  지출
                </button>
                <button
                  onClick={() => setSelectedTab("income")}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    selectedTab === "income"
                      ? "bg-white text-blue-700 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  수입
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center">
                <div className="bg-red-50 rounded-lg p-3 mr-4">
                  <TrendingDown className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">총 지출</p>
                  <p className="text-xl font-bold text-red-600">
                    {formatCurrency(expenseTotal)}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-blue-50 rounded-lg p-3 mr-4">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">총 수입</p>
                  <p className="text-xl font-bold text-blue-600">
                    {formatCurrency(incomeTotal)}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-emerald-50 rounded-lg p-3 mr-4">
                  <DollarSign className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">순 수익</p>
                  <p
                    className={`text-xl font-bold ${
                      incomeTotal - expenseTotal >= 0
                        ? "text-emerald-600"
                        : "text-red-600"
                    }`}
                  >
                    {formatCurrency(incomeTotal - expenseTotal)}
                  </p>
                </div>
              </div>
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
            className="rounded-xl border border-gray-200 bg-white shadow-sm"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  필터 설정
                </h2>
                <button
                  type="button"
                  onClick={() => setIsFilterPanelOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="relative">
                  <label
                    htmlFor="search"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    검색
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="search"
                      placeholder="설명 또는 메모 검색..."
                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm pl-10"
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
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    카테고리
                  </label>
                  <div className="relative">
                    <select
                      id="category"
                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm appearance-none pr-8"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      {currentCategories.map((category) => (
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
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    결제 수단
                  </label>
                  <div className="relative">
                    <select
                      id="payment-method"
                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm appearance-none pr-8"
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
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    기간
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="date"
                      id="start-date"
                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                    <span className="text-gray-500">~</span>
                    <input
                      type="date"
                      id="end-date"
                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* 추가 필터 옵션 */}
              <div className="flex flex-wrap items-center gap-6 mb-6">
                <div className="flex items-center">
                  <input
                    id="different-amount"
                    name="different-amount"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    checked={showDifferentAmountOnly}
                    onChange={(e) =>
                      setShowDifferentAmountOnly(e.target.checked)
                    }
                  />
                  <label
                    htmlFor="different-amount"
                    className="ml-3 block text-sm text-gray-700"
                  >
                    결제금액과 실제금액이 다른 항목만 보기
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
                    className="ml-3 block text-sm text-gray-700"
                  >
                    정기거래만 보기
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
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
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
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
              {selectedTab !== "all" && (
                <div className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1.5 text-sm">
                  <span className="font-medium text-emerald-700 mr-1">
                    구분:
                  </span>
                  <span className="text-emerald-600">
                    {selectedTab === "expense" ? "지출" : "수입"}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFilter("tab")}
                    className="ml-2 text-emerald-400 hover:text-emerald-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
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
                  <span className="text-purple-600">
                    {selectedPaymentMethod}
                  </span>
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
                  <span className="text-emerald-700">정기거래</span>
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
                  <span className="font-medium text-indigo-700 mr-1">
                    기간:
                  </span>
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
        {filteredTransactions.length > 0 && activeFilterCount > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <p className="text-sm font-medium text-gray-500">필터링된 거래</p>
              <div className="flex items-center justify-between mt-2">
                <h3 className="text-2xl font-bold text-gray-900">
                  {formatCurrency(
                    filteredTransactions.reduce(
                      (sum, transaction) => sum + transaction.actualAmount,
                      0
                    )
                  )}
                </h3>
                <span className="text-sm font-medium text-gray-500">
                  {filteredTransactions.length}건
                </span>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <p className="text-sm font-medium text-gray-500">평균 거래</p>
              <div className="flex items-center justify-between mt-2">
                <h3 className="text-2xl font-bold text-gray-900">
                  {formatCurrency(
                    filteredTransactions.length > 0
                      ? filteredTransactions.reduce(
                          (sum, transaction) => sum + transaction.actualAmount,
                          0
                        ) / filteredTransactions.length
                      : 0
                  )}
                </h3>
                <span className="text-sm font-medium text-gray-500">건당</span>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <p className="text-sm font-medium text-gray-500">최대 거래</p>
              <div className="flex items-center justify-between mt-2">
                <h3 className="text-2xl font-bold text-gray-900">
                  {formatCurrency(
                    filteredTransactions.length > 0
                      ? Math.max(
                          ...filteredTransactions.map(
                            (transaction) => transaction.actualAmount
                          )
                        )
                      : 0
                  )}
                </h3>
                <span className="text-sm font-medium text-gray-500">
                  {filteredTransactions.length > 0
                    ? filteredTransactions.find(
                        (e) =>
                          e.actualAmount ===
                          Math.max(
                            ...filteredTransactions.map(
                              (exp) => exp.actualAmount
                            )
                          )
                      )?.category
                    : ""}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 거래 목록 테이블 또는 빈 상태 */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">거래 내역</h2>
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                >
                  <Download className="mr-2 -ml-1 h-4 w-4" />
                  내보내기
                </button>
                <button
                  type="button"
                  className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                  disabled={selectedItems.length === 0}
                >
                  <Trash2 className="mr-2 -ml-1 h-4 w-4 text-red-500" />
                  선택 삭제 ({selectedItems.length})
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            {allTransactions.length === 0 ? (
              // 데이터 자체가 없는 경우 - 빈 상태 화면
              <div className="flex flex-col items-center justify-center py-12 px-4 text-center bg-gray-50 rounded-xl">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 mb-4">
                  <Receipt className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  거래 내역이 없습니다
                </h3>
                <p className="text-sm text-gray-500 mb-6 max-w-md">
                  아직 등록된 거래 내역이 없습니다. 지출이나 수입을 추가하여
                  가계부 관리를 시작해보세요.
                </p>
                <Link
                  to="/transactions/add"
                  className="inline-flex items-center justify-center rounded-lg border border-transparent bg-emerald-600 px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors"
                >
                  <Plus className="mr-2 -ml-1 h-4 w-4" />첫 거래 추가하기
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <div className="mt-8 border-t border-gray-200 pt-6 w-full max-w-md">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">
                    다른 방법으로 시작하기
                  </h4>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                    >
                      <Download className="mr-2 -ml-1 h-4 w-4" />
                      템플릿 다운로드
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
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
                {filteredTransactions.length > 0 ? (
                  // 검색 결과가 있는 경우
                  <div className="border rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="w-12 px-6 py-4 text-center"
                            >
                              <input
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                checked={
                                  selectedItems.length ===
                                    displayedTransactions.length &&
                                  displayedTransactions.length > 0
                                }
                                onChange={toggleSelectAll}
                                disabled={displayedTransactions.length === 0}
                              />
                            </th>
                            {columns.find((col) => col.id === "date")
                              ?.visible && (
                              <th
                                scope="col"
                                className="px-6 py-4 text-left text-sm font-semibold text-gray-900 w-28"
                              >
                                날짜
                              </th>
                            )}
                            {columns.find((col) => col.id === "type")
                              ?.visible && (
                              <th
                                scope="col"
                                className="px-6 py-4 text-left text-sm font-semibold text-gray-900 w-20"
                              >
                                구분
                              </th>
                            )}
                            {columns.find((col) => col.id === "category")
                              ?.visible && (
                              <th
                                scope="col"
                                className="px-6 py-4 text-left text-sm font-semibold text-gray-900 w-24"
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
                                className="px-6 py-4 text-right text-sm font-semibold text-gray-900 w-32"
                              >
                                결제금액
                              </th>
                            )}
                            {columns.find((col) => col.id === "actualAmount")
                              ?.visible && (
                              <th
                                scope="col"
                                className="px-6 py-4 text-right text-sm font-semibold text-gray-900 w-32"
                              >
                                실제금액
                              </th>
                            )}
                            {columns.find((col) => col.id === "paymentMethod")
                              ?.visible && (
                              <th
                                scope="col"
                                className="px-6 py-4 text-left text-sm font-semibold text-gray-900 w-24"
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
                              className="px-6 py-4 text-center text-sm font-semibold text-gray-900 w-20"
                            >
                              액션
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {displayedTransactions.map((transaction) => (
                            <tr
                              key={transaction.id}
                              className={`hover:bg-gray-50 ${
                                transaction.isRecurring ? "bg-blue-50" : ""
                              } ${
                                transaction.isDifferentAmount
                                  ? "bg-amber-50"
                                  : ""
                              }`}
                            >
                              <td className="w-12 px-6 py-4 text-center">
                                <input
                                  type="checkbox"
                                  className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                                  checked={selectedItems.includes(
                                    transaction.id
                                  )}
                                  onChange={() =>
                                    toggleItemSelection(transaction.id)
                                  }
                                />
                              </td>
                              {columns.find((col) => col.id === "date")
                                ?.visible && (
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 w-28">
                                  {transaction.date}
                                </td>
                              )}
                              {columns.find((col) => col.id === "type")
                                ?.visible && (
                                <td className="whitespace-nowrap px-6 py-4 text-sm w-20">
                                  <span
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                      transaction.type === "expense"
                                        ? "bg-red-100 text-red-800"
                                        : "bg-blue-100 text-blue-800"
                                    }`}
                                  >
                                    {transaction.type === "expense"
                                      ? "지출"
                                      : "수입"}
                                  </span>
                                </td>
                              )}
                              {columns.find((col) => col.id === "category")
                                ?.visible && (
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 w-24">
                                  <span
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                                    ${
                                      transaction.category === "식비"
                                        ? "bg-rose-100 text-rose-800"
                                        : transaction.category === "교통비"
                                        ? "bg-blue-100 text-blue-800"
                                        : transaction.category === "급여"
                                        ? "bg-emerald-100 text-emerald-800"
                                        : transaction.category === "부수입"
                                        ? "bg-purple-100 text-purple-800"
                                        : "bg-amber-100 text-amber-800"
                                    }`}
                                  >
                                    {transaction.category}
                                  </span>
                                </td>
                              )}
                              {columns.find((col) => col.id === "description")
                                ?.visible && (
                                <td className="px-6 py-4 text-sm text-gray-900">
                                  {transaction.description}
                                </td>
                              )}
                              {columns.find((col) => col.id === "paymentAmount")
                                ?.visible && (
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-right font-medium text-gray-900 w-32">
                                  {formatCurrency(transaction.paymentAmount)}
                                </td>
                              )}
                              {columns.find((col) => col.id === "actualAmount")
                                ?.visible && (
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-right font-medium w-32">
                                  <span
                                    className={
                                      transaction.type === "expense"
                                        ? "text-red-600"
                                        : "text-blue-600"
                                    }
                                  >
                                    {transaction.type === "expense" ? "-" : "+"}
                                    {formatCurrency(transaction.actualAmount)}
                                  </span>
                                </td>
                              )}
                              {columns.find((col) => col.id === "paymentMethod")
                                ?.visible && (
                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 w-24">
                                  {transaction.paymentMethod}
                                </td>
                              )}
                              {columns.find((col) => col.id === "memo")
                                ?.visible && (
                                <td className="px-6 py-4 text-sm text-gray-500 max-w-[200px] truncate">
                                  {transaction.memo}
                                </td>
                              )}
                              <td className="whitespace-nowrap px-6 py-4 text-center w-20">
                                <button
                                  type="button"
                                  className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                                >
                                  <Edit className="h-3 w-3" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        {displayedTransactions.length > 0 && (
                          <tfoot className="bg-gray-50">
                            <tr className="border-t-2 border-gray-300">
                              <th
                                colSpan={
                                  2 +
                                  columns.filter(
                                    (col) =>
                                      col.visible &&
                                      col.id !== "paymentAmount" &&
                                      col.id !== "actualAmount"
                                  ).length
                                }
                                scope="row"
                                className="px-6 py-4 text-left text-sm font-semibold text-gray-900"
                              >
                                합계 ({displayedTransactions.length}건)
                              </th>
                              {columns.find((col) => col.id === "paymentAmount")
                                ?.visible && (
                                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900 w-32">
                                  {formatCurrency(totalPaymentAmount)}
                                </th>
                              )}
                              {columns.find((col) => col.id === "actualAmount")
                                ?.visible && (
                                <th className="px-6 py-4 text-right text-sm font-semibold w-32">
                                  <span
                                    className={
                                      totalActualAmount >= 0
                                        ? "text-blue-600"
                                        : "text-red-600"
                                    }
                                  >
                                    {totalActualAmount >= 0 ? "+" : ""}
                                    {formatCurrency(totalActualAmount)}
                                  </span>
                                </th>
                              )}
                              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 w-20"></th>
                            </tr>
                          </tfoot>
                        )}
                      </table>
                    </div>
                  </div>
                ) : (
                  // 검색 결과가 없는 경우
                  <div className="flex flex-col items-center justify-center py-12 px-4 text-center bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-3">
                      <Search className="h-6 w-6 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      검색 결과가 없습니다
                    </h3>
                    <p className="text-sm text-gray-500 mb-3 max-w-md">
                      현재 적용된 필터와 일치하는 거래 내역을 찾을 수 없습니다.
                    </p>
                    <button
                      type="button"
                      onClick={resetFilters}
                      className="inline-flex items-center justify-center rounded-lg border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors"
                    >
                      <Filter className="mr-2 -ml-1 h-4 w-4" />
                      필터 초기화
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* 더보기 버튼 */}
          {displayedTransactions.length > 0 &&
            displayedItemsCount < filteredTransactions.length && (
              <div className="border-t border-gray-200 px-6 py-4">
                <div className="flex items-center justify-center">
                  <button
                    type="button"
                    onClick={handleLoadMore}
                    className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-6 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
                  >
                    더보기 ({filteredTransactions.length - displayedItemsCount}
                    개 더 있음)
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
        </div>
      </div>

      {/* 컬럼 설정 모달 */}
      {isColumnModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <div className="fixed inset-0 bg-black bg-opacity-25" />
            <div className="relative w-full max-w-md transform overflow-hidden rounded-xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-4">
                표시 항목 설정
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                테이블에 표시할 항목을 선택하세요.
              </p>

              <div className="space-y-4 mb-6">
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

              <div className="flex justify-end">
                <button
                  type="button"
                  className="inline-flex justify-center rounded-lg border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                >
                  확인
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Expenses;
