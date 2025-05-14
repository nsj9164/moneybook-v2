import { useAuth } from "@/contexts/AuthContext";
import {
  BarChart3,
  CreditCard,
  Home,
  PieChart,
  Settings,
  User,
  Wallet,
  LogOut,
  Plus,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar = ({ onClose }: SidebarProps) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const { logout } = useAuth();

  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex h-16 items-center border-b px-4">
        <Wallet className="mr-2 h-7 w-7 text-emerald-600" />
        <h1 className="text-lg font-bold text-emerald-600">MoneyBook</h1>
        {onClose && (
          <button
            type="button"
            className="ml-auto rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none"
            onClick={onClose}
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* 빠른 추가 버튼 */}
      <div className="px-4 py-4">
        <Link
          to={"/expenses/edit"}
          className="flex w-full items-center justify-center rounded-full bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 transition-colors"
        >
          <Plus className="mr-2 h-4 w-4" />
          빠른 지출 추가
        </Link>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        <Link
          to="/"
          className={`flex items-center rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
            currentPath === "/"
              ? "bg-emerald-50 text-emerald-600"
              : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
          }`}
        >
          <Home className="mr-3 h-5 w-5 flex-shrink-0" />
          대시보드
        </Link>
        <Link
          to="/expenses"
          className={`flex items-center rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
            currentPath.includes("/expenses")
              ? "bg-emerald-50 text-emerald-600"
              : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
          }`}
        >
          <CreditCard className="mr-3 h-5 w-5 flex-shrink-0" />
          지출 관리
        </Link>
        <Link
          to="/statistics"
          className={`flex items-center rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
            currentPath === "/statistics"
              ? "bg-emerald-50 text-emerald-600"
              : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
          }`}
        >
          <BarChart3 className="mr-3 h-5 w-5 flex-shrink-0" />
          통계
        </Link>
        <Link
          to="/budget"
          className={`flex items-center rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
            currentPath === "/budget"
              ? "bg-emerald-50 text-emerald-600"
              : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
          }`}
        >
          <PieChart className="mr-3 h-5 w-5 flex-shrink-0" />
          예산 계획
        </Link>

        <div className="border-t border-gray-200 pt-4 mt-4">
          <Link
            to="/settings"
            className={`flex items-center rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
              currentPath === "/settings"
                ? "bg-emerald-50 text-emerald-600"
                : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <Settings className="mr-3 h-5 w-5 flex-shrink-0" />
            설정
          </Link>
          <Link
            to="/profile"
            className={`flex items-center rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
              currentPath === "/profile"
                ? "bg-emerald-50 text-emerald-600"
                : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <User className="mr-3 h-5 w-5 flex-shrink-0" />
            프로필
          </Link>
        </div>
      </nav>

      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center">
          <img
            className="h-8 w-8 rounded-full object-cover"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="사용자 프로필"
          />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">홍길동</p>
            <p className="text-xs text-gray-500">user@example.com</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="mt-3 flex w-full items-center rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
        >
          <LogOut className="mr-3 h-5 w-5 flex-shrink-0" />
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
