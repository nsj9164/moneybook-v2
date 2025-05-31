import { useState } from "react";
import { Pencil, Trash2, X, Calendar, CreditCard } from "lucide-react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { GenericFormHeader } from "../common/GenericFormHeader";
import { PaginationFooter } from "../common/pagination/PaginationFooter";
import { usePagination } from "../utils/usePagination";
import { formatCurrency } from "@/utils/format";
import { GenericFormModal } from "../common/Modal/GenericFormModal";
import { deleteItem, saveItem } from "@/utils/crud";

// 샘플 데이터
const initialRecurringExpenses = [
  {
    id: "1",
    title: "월세",
    amount: 500000,
    category: "주거비",
    paymentMethod: "계좌이체",
    paymentDay: 25,
    startDate: "2023-01-25",
    endDate: null,
    frequency: "monthly",
    memo: "매월 25일 자동이체",
    isActive: true,
  },
  {
    id: "2",
    title: "휴대폰 요금",
    amount: 55000,
    category: "통신비",
    paymentMethod: "자동이체",
    paymentDay: 15,
    startDate: "2023-02-15",
    endDate: null,
    frequency: "monthly",
    memo: "KT 통신비",
    isActive: true,
  },
  {
    id: "3",
    title: "넷플릭스",
    amount: 17000,
    category: "여가",
    paymentMethod: "신용카드",
    paymentDay: 10,
    startDate: "2023-01-10",
    endDate: null,
    frequency: "monthly",
    memo: "프리미엄 요금제",
    isActive: true,
  },
  {
    id: "4",
    title: "헬스장 회비",
    amount: 99000,
    category: "의료/건강",
    paymentMethod: "신용카드",
    paymentDay: 5,
    startDate: "2023-03-05",
    endDate: "2023-12-05",
    frequency: "monthly",
    memo: "1년 약정",
    isActive: true,
  },
  {
    id: "5",
    title: "아이폰 할부금",
    amount: 65000,
    category: "쇼핑",
    paymentMethod: "신용카드",
    paymentDay: 20,
    startDate: "2023-04-20",
    endDate: "2024-04-20",
    frequency: "monthly",
    memo: "24개월 할부",
    isActive: true,
  },
  {
    id: "6",
    title: "인터넷 요금",
    amount: 35000,
    category: "통신비",
    paymentMethod: "자동이체",
    paymentDay: 15,
    startDate: "2023-02-15",
    endDate: null,
    frequency: "monthly",
    memo: "KT 인터넷",
    isActive: true,
  },
  {
    id: "7",
    title: "전기세",
    amount: 45000,
    category: "주거비",
    paymentMethod: "자동이체",
    paymentDay: 25,
    startDate: "2023-01-25",
    endDate: null,
    frequency: "monthly",
    memo: "변동 금액",
    isActive: true,
  },
  {
    id: "8",
    title: "수도세",
    amount: 30000,
    category: "주거비",
    paymentMethod: "자동이체",
    paymentDay: 25,
    startDate: "2023-01-25",
    endDate: null,
    frequency: "bimonthly",
    memo: "2개월마다 청구",
    isActive: true,
  },
];

// 카테고리 샘플 데이터
const categories = [
  { id: "1", name: "식비", color: "#ef4444", icon: "🍔" },
  { id: "2", name: "교통비", color: "#3b82f6", icon: "🚗" },
  { id: "3", name: "주거비", color: "#f59e0b", icon: "🏠" },
  { id: "4", name: "통신비", color: "#10b981", icon: "📱" },
  { id: "5", name: "의료/건강", color: "#6366f1", icon: "💊" },
  { id: "6", name: "교육", color: "#8b5cf6", icon: "📚" },
  { id: "7", name: "쇼핑", color: "#ec4899", icon: "🛍️" },
  { id: "8", name: "여가", color: "#14b8a6", icon: "🎮" },
  { id: "9", name: "기타", color: "#6b7280", icon: "📌" },
];

// 결제수단 샘플 데이터
const paymentMethods = [
  { id: "1", name: "신용카드", icon: "💳" },
  { id: "2", name: "체크카드", icon: "💳" },
  { id: "3", name: "현금", icon: "💵" },
  { id: "4", name: "계좌이체", icon: "🏦" },
  { id: "5", name: "자동이체", icon: "⏱️" },
  { id: "6", name: "네이버페이", icon: "🟢" },
  { id: "7", name: "카카오페이", icon: "🟡" },
  { id: "8", name: "토스", icon: "🔵" },
  { id: "9", name: "기타", icon: "📌" },
];

// 주기 옵션
const frequencyOptions = [
  { value: "daily", label: "매일" },
  { value: "weekly", label: "매주" },
  { value: "biweekly", label: "격주" },
  { value: "monthly", label: "매월" },
  { value: "bimonthly", label: "격월" },
  { value: "quarterly", label: "분기" },
  { value: "semiannually", label: "반기" },
  { value: "annually", label: "매년" },
];

interface RecurringExpense {
  id: string;
  title: string;
  amount: number;
  category: string;
  paymentMethod: string;
  paymentDay: number;
  startDate: string;
  endDate: string | null;
  frequency: string;
  memo: string;
  isActive: boolean;
}

interface RecurringExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (expense: RecurringExpense) => void;
  expense?: RecurringExpense;
  isEditing: boolean;
}

const ManageRecurringExpenses = () => {
  const [recurringExpenses, setRecurringExpenses] = useState<
    RecurringExpense[]
  >(initialRecurringExpenses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentExpense, setCurrentExpense] = useState<
    RecurringExpense | undefined
  >(undefined);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterActive, setFilterActive] = useState<string>("all");
  const itemsPerPage = 6;

  // 검색 및 필터링 적용된 고정지출 목록
  const filteredExpenses = recurringExpenses.filter((expense) => {
    const matchesSearch = expense.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || expense.category === filterCategory;
    const matchesActive =
      filterActive === "all" ||
      (filterActive === "active" && expense.isActive) ||
      (filterActive === "inactive" && !expense.isActive);
    return matchesSearch && matchesCategory && matchesActive;
  });

  const { currentPage, totalPages, handlePageChange, startIndex, endIndex } =
    usePagination(filteredExpenses.length);

  const paginatedExpenses = filteredExpenses.slice(
    (currentPage - 1) * 10,
    currentPage * 10
  );

  const handleAddExpense = () => {
    setCurrentExpense(undefined);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEditExpense = (expense: RecurringExpense) => {
    setCurrentExpense(expense);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDeleteExpense = (expenseId: string) => {
    if (window.confirm("이 고정지출을 삭제하시겠습니까?")) {
      setRecurringExpenses(recurringExpenses.filter((e) => e.id !== expenseId));
    }
  };

  const handleToggleActive = (expenseId: string) => {
    setRecurringExpenses(
      recurringExpenses.map((expense) =>
        expense.id === expenseId
          ? { ...expense, isActive: !expense.isActive }
          : expense
      )
    );
  };

  const handleDeleteRecurring = async (id: number) => {
    await deleteItem("categories", id, () => {
      // setCategories((prev) => prev.filter((item) => item.id !== id));
    });
  };

  const handleSaveRecurring = async (category: Partial<ICategory>) => {
    await saveItem("categories", category, userId!, (saved) => {
      // setCategories((prev) => patchOrAddItem(prev, saved));
    });
  };

  const handleSaveData = async (data: Partial<FormMap[K]>) => {
    await onSave(data);
    setIsModalOpen(false);
  };

  const handleSaveExpense = (expense: RecurringExpense) => {
    await onSave(data);
    setIsModalOpen(false);
  };

  // 총 월간 고정지출 계산
  const totalMonthlyAmount = recurringExpenses
    .filter((expense) => expense.isActive)
    .reduce((sum, expense) => {
      // 주기에 따른 월간 환산 금액 계산
      let monthlyAmount = 0;
      switch (expense.frequency) {
        case "daily":
          monthlyAmount = expense.amount * 30;
          break;
        case "weekly":
          monthlyAmount = expense.amount * 4.33;
          break;
        case "biweekly":
          monthlyAmount = expense.amount * 2.17;
          break;
        case "monthly":
          monthlyAmount = expense.amount;
          break;
        case "bimonthly":
          monthlyAmount = expense.amount / 2;
          break;
        case "quarterly":
          monthlyAmount = expense.amount / 3;
          break;
        case "semiannually":
          monthlyAmount = expense.amount / 6;
          break;
        case "annually":
          monthlyAmount = expense.amount / 12;
          break;
        default:
          monthlyAmount = expense.amount;
      }
      return sum + monthlyAmount;
    }, 0);

  return (
    <div className="bg-white h-full">
      <GenericFormHeader title="고정지출" handleAddData={handleAddExpense} />

      <div className="p-4">
        {/* 요약 정보 */}
        <div className="mb-4 bg-gray-50 p-4 rounded-lg">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                월간 고정지출 요약
              </h3>
              <p className="text-sm text-gray-500">
                활성화된 고정지출{" "}
                {recurringExpenses.filter((e) => e.isActive).length}개
              </p>
            </div>
            <div className="mt-3 sm:mt-0">
              <p className="text-sm text-gray-500">
                총 월간 고정지출:{" "}
                <span className="font-medium text-gray-900">
                  {formatCurrency(totalMonthlyAmount)}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* 검색 및 필터 */}
        <div className="mb-4 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label htmlFor="search" className="sr-only">
              고정지출 검색
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                id="search"
                name="search"
                className="block w-full rounded-md border-0 py-2 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm"
                placeholder="고정지출 검색"
                type="search"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  handlePageChange(1);
                }}
              />
            </div>
          </div>

          <div>
            <label htmlFor="category-filter" className="sr-only">
              카테고리 필터
            </label>
            <select
              id="category-filter"
              name="category-filter"
              className="block w-full rounded-md border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm"
              value={filterCategory}
              onChange={(e) => {
                setFilterCategory(e.target.value);
                handlePageChange(1);
              }}
            >
              <option value="all">모든 카테고리</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="active-filter" className="sr-only">
              상태 필터
            </label>
            <select
              id="active-filter"
              name="active-filter"
              className="block w-full rounded-md border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm"
              value={filterActive}
              onChange={(e) => {
                setFilterActive(e.target.value);
                handlePageChange(1);
              }}
            >
              <option value="all">모든 상태</option>
              <option value="active">활성화</option>
              <option value="inactive">비활성화</option>
            </select>
          </div>
        </div>

        {/* 고정지출 목록 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paginatedExpenses.length > 0 ? (
            paginatedExpenses.map((expense) => (
              <div
                key={expense.id}
                className={`rounded-lg border ${
                  expense.isActive
                    ? "border-gray-200"
                    : "border-gray-200 bg-gray-50"
                } shadow-sm p-4 hover:shadow-md transition-shadow`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center">
                    <div
                      className="h-8 w-8 rounded-full flex items-center justify-center mr-3"
                      style={{
                        backgroundColor:
                          categories.find((c) => c.name === expense.category)
                            ?.color || "#6b7280",
                      }}
                    >
                      <span className="text-white text-sm">
                        {categories.find((c) => c.name === expense.category)
                          ?.icon || "📌"}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-base font-medium text-gray-900">
                        {expense.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {expense.category}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">
                      {formatCurrency(expense.amount)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {frequencyOptions.find(
                        (f) => f.value === expense.frequency
                      )?.label || "매월"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>
                    매월 {expense.paymentDay}일
                    {expense.endDate
                      ? ` (${expense.endDate.substring(0, 7)}까지)`
                      : ""}
                  </span>
                </div>

                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <CreditCard className="h-4 w-4 mr-1" />
                  <span>
                    {paymentMethods.find(
                      (p) => p.name === expense.paymentMethod
                    )?.icon || "💳"}{" "}
                    {expense.paymentMethod}
                  </span>
                </div>

                {expense.memo && (
                  <p className="text-sm text-gray-600 mb-3">{expense.memo}</p>
                )}

                <div className="flex justify-between items-center mt-2">
                  <div>
                    <button
                      onClick={() => handleToggleActive(expense.id)}
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
                      onClick={() => handleEditExpense(expense)}
                      className="text-emerald-600 hover:text-emerald-900"
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">편집</span>
                    </button>
                    <button
                      onClick={() => handleDeleteExpense(expense.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">삭제</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="md:col-span-2 p-8 text-center text-gray-500">
              <p>검색 조건에 맞는 고정지출이 없습니다.</p>
            </div>
          )}
        </div>

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <PaginationFooter
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
            startIndex={startIndex}
            endIndex={endIndex}
          />
        )}
      </div>

      <GenericFormModal
        formTitle="고정지출"
        isOpen={isModalOpen}
        isEditing={isEditing}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSaveExpense}
      >
        <RecurringExpenseModal />
      </GenericFormModal>
    </div>
  );
};

// 고정지출 추가/수정 모달
const RecurringExpenseModal = ({
  isOpen,
  onClose,
  onSave,
  expense,
  isEditing,
}: RecurringExpenseModalProps) => {
  const [form, setForm] = useState<RecurringExpense>({
    id: expense?.id || "",
    title: expense?.title || "",
    amount: expense?.amount || 0,
    category: expense?.category || "기타",
    paymentMethod: expense?.paymentMethod || "신용카드",
    paymentDay: expense?.paymentDay || 1,
    startDate: expense?.startDate || new Date().toISOString().split("T")[0],
    endDate: expense?.endDate || null,
    frequency: expense?.frequency || "monthly",
    memo: expense?.memo || "",
    isActive: expense?.isActive ?? true,
  });

  // 모달이 열릴 때마다 폼 초기화
  useState(() => {
    if (isOpen) {
      setForm({
        id: expense?.id || "",
        title: expense?.title || "",
        amount: expense?.amount || 0,
        category: expense?.category || "기타",
        paymentMethod: expense?.paymentMethod || "신용카드",
        paymentDay: expense?.paymentDay || 1,
        startDate: expense?.startDate || new Date().toISOString().split("T")[0],
        endDate: expense?.endDate || null,
        frequency: expense?.frequency || "monthly",
        memo: expense?.memo || "",
        isActive: expense?.isActive ?? true,
      });
    }
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "number") {
      setForm({ ...form, [name]: Number(value) });
    } else if (name === "isActive") {
      setForm({ ...form, isActive: (e.target as HTMLInputElement).checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };
};
