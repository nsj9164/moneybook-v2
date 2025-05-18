import {
  BarChart3,
  CreditCard,
  Home,
  PieChart,
  Settings,
  User,
  Calendar,
  TrendingUp,
  LogOut,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar = ({ onClose }: SidebarProps) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="flex h-full flex-col">
      {/* 모바일 닫기 버튼 */}
      {onClose && (
        <div className="flex items-center justify-end p-4 lg:hidden">
          <button
            type="button"
            className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            onClick={onClose}
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="h-6 w-6"
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
        </div>
      )}

      {/* 사용자 프로필 영역 */}
      <div className="flex items-center px-6 py-4 border-b">
        <img
          className="h-10 w-10 rounded-full"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt="사용자 프로필"
        />
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-900">홍길동</p>
          <p className="text-xs text-gray-500">user@example.com</p>
        </div>
      </div>

      {/* 메뉴 영역 */}
      <nav className="flex-1 space-y-1 px-4 py-6">
        <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          메인 메뉴
        </p>
        <Link
          to="/"
          className={`flex items-center rounded-md px-3 py-2.5 text-sm font-medium ${
            currentPath === "/"
              ? "bg-emerald-50 text-emerald-600"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          }`}
        >
          <Home className="mr-3 h-5 w-5 flex-shrink-0" />
          대시보드
        </Link>
        <Link
          to="/expenses"
          className={`flex items-center rounded-md px-3 py-2.5 text-sm font-medium ${
            currentPath.includes("/expenses")
              ? "bg-emerald-50 text-emerald-600"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          }`}
        >
          <CreditCard className="mr-3 h-5 w-5 flex-shrink-0" />
          지출 관리
        </Link>
        <Link
          to="/statistics"
          className={`flex items-center rounded-md px-3 py-2.5 text-sm font-medium ${
            currentPath === "/statistics"
              ? "bg-emerald-50 text-emerald-600"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          }`}
        >
          <BarChart3 className="mr-3 h-5 w-5 flex-shrink-0" />
          통계
        </Link>
        <Link
          to="/budget"
          className={`flex items-center rounded-md px-3 py-2.5 text-sm font-medium ${
            currentPath === "/budget"
              ? "bg-emerald-50 text-emerald-600"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          }`}
        >
          <PieChart className="mr-3 h-5 w-5 flex-shrink-0" />
          예산 계획
        </Link>

        <div className="mt-6">
          <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            추가 기능
          </p>
          <div className="mt-2 space-y-1">
            <Link
              to="/calendar"
              className="flex items-center rounded-md px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <Calendar className="mr-3 h-5 w-5 flex-shrink-0" />
              캘린더
            </Link>
            <Link
              to="/goals"
              className="flex items-center rounded-md px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <TrendingUp className="mr-3 h-5 w-5 flex-shrink-0" />
              재정 목표
            </Link>
          </div>
        </div>

        <div className="mt-6">
          <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            계정
          </p>
          <div className="mt-2 space-y-1">
            <Link
              to="/settings"
              className={`flex items-center rounded-md px-3 py-2.5 text-sm font-medium ${
                currentPath === "/settings"
                  ? "bg-emerald-50 text-emerald-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Settings className="mr-3 h-5 w-5 flex-shrink-0" />
              설정
            </Link>
            <Link
              to="/profile"
              className={`flex items-center rounded-md px-3 py-2.5 text-sm font-medium ${
                currentPath === "/profile"
                  ? "bg-emerald-50 text-emerald-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <User className="mr-3 h-5 w-5 flex-shrink-0" />
              프로필
            </Link>
          </div>
        </div>
      </nav>

      {/* 로그아웃 버튼 */}
      <div className="border-t border-gray-200 p-4">
        <button className="flex w-full items-center rounded-md px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900">
          <LogOut className="mr-3 h-5 w-5 flex-shrink-0" />
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
