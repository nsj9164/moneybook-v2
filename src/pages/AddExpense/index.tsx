import { ArrowLeft, Plus, Save, Trash2, X } from "lucide-react";
import AddExpenseDesktop from "./AddExpenseDesktop";
import AddExpenseMobile from "./AddExpenseMobile";

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

const AddExpense = () => {
  // 퍼블리싱 목적으로 정적 데이터 사용
  const expenses = sampleExpenses;
  const isMobile = window.innerWidth < 768;

  return (
    <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-sm mt-6 mb-6">
      {/* 헤더 영역 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="flex items-center mb-4 sm:mb-0">
          <button
            type="button"
            className="mr-3 p-1 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">뒤로 가기</span>
          </button>
          <h1 className="text-2xl font-bold text-gray-900">지출 추가</h1>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors"
          >
            <Plus className="mr-2 -ml-1 h-4 w-4" />새 항목 추가
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors"
          >
            <Save className="mr-2 -ml-1 h-4 w-4" />
            모두 저장
          </button>
        </div>
      </div>

      {/* 데스크톱 뷰 - 테이블 형식 */}
      {/* 모바일 뷰 - 카드 형식 */}
      {isMobile ? <AddExpenseMobile /> : <AddExpenseDesktop />}

      {/* 요약 정보 */}
      <div className="mt-6 bg-gray-50 p-4 rounded-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">요약</h3>
            <p className="text-sm text-gray-500">
              총 {expenses.length}개 항목, {expenses.length}개 유효
            </p>
          </div>
          <div className="mt-3 sm:mt-0 space-y-1">
            <p className="text-sm text-gray-500">
              총 결제 금액:{" "}
              <span className="font-medium text-gray-900">
                {new Intl.NumberFormat("ko-KR", {
                  style: "currency",
                  currency: "KRW",
                  maximumFractionDigits: 0,
                }).format(27000)}
              </span>
            </p>
            <p className="text-sm text-gray-500">
              총 실제 지출:{" "}
              <span className="font-medium text-gray-900">
                {new Intl.NumberFormat("ko-KR", {
                  style: "currency",
                  currency: "KRW",
                  maximumFractionDigits: 0,
                }).format(21000)}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* 하단 고정 저장 버튼 (모바일) */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <button
            type="button"
            className="w-full inline-flex items-center justify-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors"
          >
            <Save className="mr-2 -ml-1 h-4 w-4" />
            모두 저장 ({expenses.length}개)
          </button>
        </div>
      )}
    </div>
  );
};

export default AddExpense;
