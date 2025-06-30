import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

export const DashboardOnboarding = () => {
  return (
    <div className="h-full">
      {/* 페이지 헤더 */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            MoneyBook에 오신 것을 환영합니다!
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            가계부 관리를 시작하여 더 나은 재정 습관을 만들어보세요.
          </p>
        </div>
      </div>

      <div className="p-6 text-center">
        <div className="py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            첫 거래를 추가해보세요!
          </h2>
          <p className="text-gray-600 mb-8">
            지출과 수입을 기록하여 재정 관리를 시작하세요.
          </p>
          <Link
            to="/expenses/add"
            className="inline-flex items-center bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
          >
            <Plus className="mr-2 h-5 w-5" />
            거래 추가하기
          </Link>
        </div>
      </div>
    </div>
  );
};
