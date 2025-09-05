"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  ChevronDown,
  Calendar,
  X,
  ChevronUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// 샘플 데이터
const sampleExpenses = [
  {
    id: "1",
    date: "2024-01-15",
    category: "식비",
    title: "점심 식사",
    amount: 15000,
    actualAmount: 15000,
    paymentMethod: "신용카드",
    memo: "회사 근처 식당",
    type: "expense" as const,
    isRecurring: false,
  },
  {
    id: "2",
    date: "2024-01-15",
    category: "교통비",
    title: "택시비",
    amount: 12000,
    actualAmount: 10000,
    paymentMethod: "신용카드",
    memo: "회식 후 귀가 (할인 적용)",
    type: "expense" as const,
    isRecurring: false,
  },
  {
    id: "3",
    date: "2024-01-14",
    category: "급여",
    title: "월급",
    amount: 3000000,
    actualAmount: 3000000,
    paymentMethod: "계좌이체",
    memo: "1월 급여",
    type: "income" as const,
    isRecurring: true,
  },
  {
    id: "4",
    date: "2024-02-14",
    category: "쇼핑",
    title: "옷 구매",
    amount: 89000,
    actualAmount: 75000,
    paymentMethod: "신용카드",
    memo: "겨울 코트 (할부 결제)",
    type: "expense" as const,
    isRecurring: false,
  },
  {
    id: "5",
    date: "2024-02-13",
    category: "여가",
    title: "영화 관람",
    amount: 14000,
    actualAmount: 14000,
    paymentMethod: "체크카드",
    memo: "주말 영화",
    type: "expense" as const,
    isRecurring: false,
  },
  {
    id: "6",
    date: "2024-03-10",
    category: "식비",
    title: "저녁 식사",
    amount: 25000,
    actualAmount: 25000,
    paymentMethod: "신용카드",
    memo: "가족 외식",
    type: "expense" as const,
    isRecurring: false,
  },
  {
    id: "7",
    date: "2024-03-05",
    category: "부업",
    title: "프리랜서 수입",
    amount: 500000,
    actualAmount: 500000,
    paymentMethod: "계좌이체",
    memo: "웹사이트 제작",
    type: "income" as const,
    isRecurring: false,
  },
  {
    id: "8",
    date: "2024-01-01",
    category: "주거비",
    title: "월세",
    amount: 800000,
    actualAmount: 800000,
    paymentMethod: "자동이체",
    memo: "매월 정기 지출",
    type: "expense" as const,
    isRecurring: true,
  },
  {
    id: "9",
    date: "2024-02-01",
    category: "주거비",
    title: "월세",
    amount: 800000,
    actualAmount: 800000,
    paymentMethod: "자동이체",
    memo: "매월 정기 지출",
    type: "expense" as const,
    isRecurring: true,
  },
  {
    id: "10",
    date: "2024-03-01",
    category: "통신비",
    title: "휴대폰 요금",
    amount: 65000,
    actualAmount: 55000,
    paymentMethod: "자동이체",
    memo: "정기 지출 (할인 적용)",
    type: "expense" as const,
    isRecurring: true,
  },
];

// 더 많은 샘플 데이터 생성
const generateMoreData = (startId: number, count: number) => {
  const categories = [
    "식비",
    "교통비",
    "쇼핑",
    "여가",
    "의료/건강",
    "교육",
    "기타",
  ];
  const incomeCategories = ["급여", "부업", "투자수익", "기타수입"];
  const recurringCategories = ["주거비", "통신비", "보험료", "구독료"];
  const paymentMethods = [
    "신용카드",
    "체크카드",
    "현금",
    "계좌이체",
    "자동이체",
  ];

  return Array.from({ length: count }, (_, i) => {
    const isIncome = Math.random() > 0.8;
    const isRecurring = Math.random() > 0.85;

    let category: string;
    if (isIncome) {
      category =
        incomeCategories[Math.floor(Math.random() * incomeCategories.length)];
    } else if (isRecurring) {
      category =
        recurringCategories[
          Math.floor(Math.random() * recurringCategories.length)
        ];
    } else {
      category = categories[Math.floor(Math.random() * categories.length)];
    }

    // 2023년 12월부터 2024년 3월까지의 랜덤 날짜
    const year = Math.random() > 0.3 ? 2024 : 2023;
    const month = year === 2024 ? Math.floor(Math.random() * 3) + 1 : 12;
    const day = Math.floor(Math.random() * 28) + 1;

    const baseAmount = isIncome
      ? Math.floor(Math.random() * 2000000) + 500000
      : Math.floor(Math.random() * 100000) + 5000;
    const hasDifferentAmount = Math.random() > 0.7; // 30% 확률로 결제금액과 실제금액이 다름
    const actualAmount = hasDifferentAmount
      ? Math.floor(baseAmount * (0.8 + Math.random() * 0.4))
      : baseAmount;

    return {
      id: (startId + i).toString(),
      date: `${year}-${month.toString().padStart(2, "0")}-${day
        .toString()
        .padStart(2, "0")}`,
      category,
      title: isIncome ? `${category} 항목` : `${category} 지출`,
      amount: baseAmount,
      actualAmount,
      paymentMethod:
        paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
      memo: `샘플 ${isIncome ? "수입" : "지출"} 데이터${
        hasDifferentAmount ? " (할인/할부)" : ""
      }`,
      type: isIncome ? ("income" as const) : ("expense" as const),
      isRecurring,
    };
  });
};

const Expenses = () => {
  const [activeTab, setActiveTab] = useState<"expense" | "income">("expense");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("전체");
  const [displayedItems, setDisplayedItems] = useState(20);
  const [allData] = useState([...sampleExpenses, ...generateMoreData(11, 50)]);

  // 기간 필터 상태
  const [selectedMonth, setSelectedMonth] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [quickPeriod, setQuickPeriod] = useState("");

  // 새로운 체크박스 필터 상태
  const [showDifferentAmountOnly, setShowDifferentAmountOnly] = useState(false);
  const [showRecurringOnly, setShowRecurringOnly] = useState(false);

  // 추가 필터 접기/펼치기 상태
  const [isAdvancedFiltersOpen, setIsAdvancedFiltersOpen] = useState(false);

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
    "보험료",
    "구독료",
    "기타",
  ];
  const incomeCategories = ["전체", "급여", "부업", "투자수익", "기타수입"];
  const paymentMethods = [
    "전체",
    "신용카드",
    "체크카드",
    "현금",
    "계좌이체",
    "자동이체",
  ];

  // 월 옵션 생성 (최근 12개월)
  const generateMonthOptions = () => {
    const options = [{ value: "", label: "전체 기간" }];
    const now = new Date();

    for (let i = 0; i < 12; i++) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const value = `${year}-${month.toString().padStart(2, "0")}`;
      const label = `${year}년 ${month}월`;
      options.push({ value, label });
    }

    return options;
  };

  const monthOptions = generateMonthOptions();

  // 빠른 기간 선택 옵션
  const quickPeriodOptions = [
    { value: "", label: "전체" },
    { value: "thisMonth", label: "이번 달" },
    { value: "lastMonth", label: "지난 달" },
    { value: "last3Months", label: "최근 3개월" },
    { value: "last6Months", label: "최근 6개월" },
    { value: "thisYear", label: "올해" },
  ];

  // 빠른 기간 선택 핸들러
  const handleQuickPeriod = (period: string) => {
    const now = new Date();
    setQuickPeriod(period);
    setSelectedMonth("");

    switch (period) {
      case "thisMonth":
        const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        const thisMonthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        setStartDate(thisMonthStart.toISOString().split("T")[0]);
        setEndDate(thisMonthEnd.toISOString().split("T")[0]);
        break;
      case "lastMonth":
        const lastMonthStart = new Date(
          now.getFullYear(),
          now.getMonth() - 1,
          1
        );
        const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
        setStartDate(lastMonthStart.toISOString().split("T")[0]);
        setEndDate(lastMonthEnd.toISOString().split("T")[0]);
        break;
      case "last3Months":
        const last3MonthsStart = new Date(
          now.getFullYear(),
          now.getMonth() - 2,
          1
        );
        setStartDate(last3MonthsStart.toISOString().split("T")[0]);
        setEndDate(now.toISOString().split("T")[0]);
        break;
      case "last6Months":
        const last6MonthsStart = new Date(
          now.getFullYear(),
          now.getMonth() - 5,
          1
        );
        setStartDate(last6MonthsStart.toISOString().split("T")[0]);
        setEndDate(now.toISOString().split("T")[0]);
        break;
      case "thisYear":
        const thisYearStart = new Date(now.getFullYear(), 0, 1);
        setStartDate(thisYearStart.toISOString().split("T")[0]);
        setEndDate(now.toISOString().split("T")[0]);
        break;
      default:
        setStartDate("");
        setEndDate("");
        break;
    }
  };

  // 월별 선택 핸들러
  const handleMonthSelect = (month: string) => {
    setSelectedMonth(month);
    setQuickPeriod("");

    if (month) {
      const [year, monthNum] = month.split("-");
      const monthStart = new Date(
        Number.parseInt(year),
        Number.parseInt(monthNum) - 1,
        1
      );
      const monthEnd = new Date(
        Number.parseInt(year),
        Number.parseInt(monthNum),
        0
      );
      setStartDate(monthStart.toISOString().split("T")[0]);
      setEndDate(monthEnd.toISOString().split("T")[0]);
    } else {
      setStartDate("");
      setEndDate("");
    }
  };

  // 필터링된 데이터
  const filteredData = allData
    .filter((item) => item.type === activeTab)
    .filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.memo.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "전체" || item.category === selectedCategory;
      const matchesPayment =
        selectedPaymentMethod === "전체" ||
        item.paymentMethod === selectedPaymentMethod;

      // 기간 필터링
      let matchesDate = true;
      if (startDate && endDate) {
        const itemDate = new Date(item.date);
        const filterStartDate = new Date(startDate);
        const filterEndDate = new Date(endDate);
        matchesDate = itemDate >= filterStartDate && itemDate <= filterEndDate;
      }

      // 새로운 체크박스 필터들
      const matchesDifferentAmount =
        !showDifferentAmountOnly || item.amount !== item.actualAmount;
      const matchesRecurring = !showRecurringOnly || item.isRecurring;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPayment &&
        matchesDate &&
        matchesDifferentAmount &&
        matchesRecurring
      );
    });

  const displayedData = filteredData.slice(0, displayedItems);
  const hasMore = displayedItems < filteredData.length;

  const handleLoadMore = () => {
    setDisplayedItems((prev) => Math.min(prev + 20, filteredData.length));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ko-KR").format(amount);
  };

  const handleDelete = (id: string) => {
    console.log("Delete item:", id);
  };

  const handleEdit = (id: string) => {
    console.log("Edit item:", id);
  };

  // 필터 초기화
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("전체");
    setSelectedPaymentMethod("전체");
    setSelectedMonth("");
    setStartDate("");
    setEndDate("");
    setQuickPeriod("");
    setShowDifferentAmountOnly(false);
    setShowRecurringOnly(false);
    setDisplayedItems(20);
  };

  // 활성 필터 개수 계산
  const activeFiltersCount = [
    searchTerm,
    selectedCategory !== "전체" ? selectedCategory : "",
    selectedPaymentMethod !== "전체" ? selectedPaymentMethod : "",
    selectedMonth || startDate || endDate ? "date" : "",
    showDifferentAmountOnly ? "differentAmount" : "",
    showRecurringOnly ? "recurring" : "",
  ].filter(Boolean).length;

  // 추가 필터가 활성화되어 있는지 확인
  const hasActiveAdvancedFilters = showDifferentAmountOnly || showRecurringOnly;

  return (
    <div className="bg-white">
      {/* 상단 헤더 */}
      <div className="bg-white border-b py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">거래 관리</h1>
            <p className="mt-1 text-sm text-gray-500">
              수입과 지출을 관리하고 분석하세요
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors"
          >
            <Plus className="mr-2 -ml-1 h-4 w-4" />
            {activeTab === "expense" ? "지출 추가" : "수입 추가"}
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-6 lg:p-8">
        {/* 탭 메뉴 */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => {
                  setActiveTab("expense");
                  setSelectedCategory("전체");
                  setDisplayedItems(20);
                }}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === "expense"
                    ? "border-red-500 text-red-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                지출 관리
              </button>
              <button
                onClick={() => {
                  setActiveTab("income");
                  setSelectedCategory("전체");
                  setDisplayedItems(20);
                }}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === "income"
                    ? "border-emerald-500 text-emerald-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                수입 관리
              </button>
            </nav>
          </div>
        </div>

        {/* 기간 선택 섹션 */}
        <div className="mb-6 bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-900 flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              기간 선택
            </h3>
            {activeFiltersCount > 0 && (
              <button
                onClick={resetFilters}
                className="text-xs text-emerald-600 hover:text-emerald-700 font-medium"
              >
                전체 초기화
              </button>
            )}
          </div>

          {/* 빠른 기간 선택 버튼들 */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {quickPeriodOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleQuickPeriod(option.value)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                    quickPeriod === option.value
                      ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                      : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* 월별 선택 및 사용자 정의 기간 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="month-select"
                className="block text-xs font-medium text-gray-700 mb-1"
              >
                월별 선택
              </label>
              <select
                id="month-select"
                value={selectedMonth}
                onChange={(e) => handleMonthSelect(e.target.value)}
                className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
              >
                {monthOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="start-date"
                className="block text-xs font-medium text-gray-700 mb-1"
              >
                시작일
              </label>
              <input
                type="date"
                id="start-date"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  setSelectedMonth("");
                  setQuickPeriod("");
                }}
                className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div>
              <label
                htmlFor="end-date"
                className="block text-xs font-medium text-gray-700 mb-1"
              >
                종료일
              </label>
              <input
                type="date"
                id="end-date"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  setSelectedMonth("");
                  setQuickPeriod("");
                }}
                className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* 활성 필터 표시 */}
        {activeFiltersCount > 0 && (
          <div className="mb-6 bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-blue-900">적용된 필터</h4>
              <span className="text-xs text-blue-600">
                {activeFiltersCount}개 적용됨
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {searchTerm && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  검색: {searchTerm}
                  <button
                    onClick={() => setSearchTerm("")}
                    className="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {selectedCategory !== "전체" && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  카테고리: {selectedCategory}
                  <button
                    onClick={() => setSelectedCategory("전체")}
                    className="ml-1 text-purple-600 hover:text-purple-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {selectedPaymentMethod !== "전체" && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  결제수단: {selectedPaymentMethod}
                  <button
                    onClick={() => setSelectedPaymentMethod("전체")}
                    className="ml-1 text-green-600 hover:text-green-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {(selectedMonth || startDate || endDate) && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                  기간:{" "}
                  {selectedMonth
                    ? monthOptions.find((m) => m.value === selectedMonth)?.label
                    : `${startDate} ~ ${endDate}`}
                  <button
                    onClick={() => {
                      setSelectedMonth("");
                      setStartDate("");
                      setEndDate("");
                      setQuickPeriod("");
                    }}
                    className="ml-1 text-orange-600 hover:text-orange-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {showDifferentAmountOnly && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  결제금액≠실제지출
                  <button
                    onClick={() => setShowDifferentAmountOnly(false)}
                    className="ml-1 text-yellow-600 hover:text-yellow-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {showRecurringOnly && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                  정기지출만
                  <button
                    onClick={() => setShowRecurringOnly(false)}
                    className="ml-1 text-indigo-600 hover:text-indigo-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
            </div>
          </div>
        )}

        {/* 필터 및 검색 */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label
              htmlFor="search"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              검색
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="search"
                placeholder="항목명 또는 메모 검색"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              />
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
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
            >
              {(activeTab === "expense" ? categories : incomeCategories).map(
                (category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                )
              )}
            </select>
          </div>

          <div>
            <label
              htmlFor="payment-method"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              결제수단
            </label>
            <select
              id="payment-method"
              value={selectedPaymentMethod}
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
            >
              {paymentMethods.map((method) => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="button"
              onClick={resetFilters}
              className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              <Filter className="mr-2 -ml-1 h-4 w-4" />
              필터 초기화
            </button>
          </div>
        </div>

        {/* 접을 수 있는 추가 필터 섹션 */}
        <div className="mb-6 bg-gray-50 rounded-lg overflow-hidden">
          <button
            onClick={() => setIsAdvancedFiltersOpen(!isAdvancedFiltersOpen)}
            className="w-full px-4 py-3 flex items-center justify-between text-sm font-medium text-gray-900 hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center">
              <span>추가 필터</span>
              {hasActiveAdvancedFilters && (
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                  {
                    [showDifferentAmountOnly, showRecurringOnly].filter(Boolean)
                      .length
                  }
                  개 적용
                </span>
              )}
            </div>
            {isAdvancedFiltersOpen ? (
              <ChevronUp className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-500" />
            )}
          </button>

          <AnimatePresence>
            {isAdvancedFiltersOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4 border-t border-gray-200">
                  <div className="pt-3 flex flex-wrap gap-4">
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={showDifferentAmountOnly}
                        onChange={(e) =>
                          setShowDifferentAmountOnly(e.target.checked)
                        }
                        className="rounded border-gray-300 text-emerald-600 shadow-sm focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        결제금액과 실제지출이 다른 항목만 보기
                      </span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={showRecurringOnly}
                        onChange={(e) => setShowRecurringOnly(e.target.checked)}
                        className="rounded border-gray-300 text-emerald-600 shadow-sm focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        정기지출만 보기
                      </span>
                    </label>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 요약 정보 */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activeTab === "expense" ? "bg-red-100" : "bg-emerald-100"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full ${
                      activeTab === "expense" ? "bg-red-500" : "bg-emerald-500"
                    }`}
                  />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  총 {activeTab === "expense" ? "지출" : "수입"}
                </p>
                <p
                  className={`text-lg font-semibold ${
                    activeTab === "expense"
                      ? "text-red-600"
                      : "text-emerald-600"
                  }`}
                >
                  {formatCurrency(
                    filteredData.reduce(
                      (sum, item) => sum + item.actualAmount,
                      0
                    )
                  )}
                  원
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-blue-500 rounded-full" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">평균 금액</p>
                <p className="text-lg font-semibold text-blue-600">
                  {formatCurrency(
                    filteredData.length > 0
                      ? Math.round(
                          filteredData.reduce(
                            (sum, item) => sum + item.actualAmount,
                            0
                          ) / filteredData.length
                        )
                      : 0
                  )}
                  원
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-purple-500 rounded-full" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">총 건수</p>
                <p className="text-lg font-semibold text-purple-600">
                  {filteredData.length}건
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 테이블 */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
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
                    항목
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    결제금액
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    실제금액
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    결제수단
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    메모
                  </th>
                  <th
                    scope="col"
                    className="relative py-3.5 pl-3 pr-4 sm:pr-6 w-20"
                  >
                    <span className="sr-only">액션</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {displayedData.map((item) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      {new Date(item.date).toLocaleDateString("ko-KR")}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            activeTab === "expense"
                              ? "bg-red-100 text-red-800"
                              : "bg-emerald-100 text-emerald-800"
                          }`}
                        >
                          {item.category}
                        </span>
                        {item.isRecurring && (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            정기
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-900 max-w-xs truncate">
                      {item.title}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm font-medium">
                      <span
                        className={
                          activeTab === "expense"
                            ? "text-red-600"
                            : "text-emerald-600"
                        }
                      >
                        {activeTab === "expense" ? "-" : "+"}
                        {formatCurrency(item.amount)}원
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm font-medium">
                      <span
                        className={
                          activeTab === "expense"
                            ? "text-red-600"
                            : "text-emerald-600"
                        }
                      >
                        {activeTab === "expense" ? "-" : "+"}
                        {formatCurrency(item.actualAmount)}원
                      </span>
                      {item.amount !== item.actualAmount && (
                        <span className="ml-1 text-xs text-yellow-600">
                          ({item.amount > item.actualAmount ? "할인" : "추가"})
                        </span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {item.paymentMethod}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500 max-w-xs truncate">
                      {item.memo}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          type="button"
                          className="text-emerald-600 hover:text-emerald-900"
                          onClick={() => handleEdit(item.id)}
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">편집</span>
                        </button>
                        <button
                          type="button"
                          className="text-red-600 hover:text-red-900"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">삭제</span>
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 더보기 버튼 */}
          {hasMore && (
            <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleLoadMore}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
                >
                  <ChevronDown className="mr-2 -ml-1 h-4 w-4" />
                  더보기 ({filteredData.length - displayedItems}개 더)
                </button>
              </div>
            </div>
          )}

          {/* 데이터 없음 */}
          {filteredData.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500">
                <p className="text-lg font-medium">데이터가 없습니다</p>
                <p className="mt-1 text-sm">
                  필터 조건을 변경하거나 새로운{" "}
                  {activeTab === "expense" ? "지출" : "수입"}을 추가해보세요.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Expenses;
