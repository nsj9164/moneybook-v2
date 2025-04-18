import {
  BarChart3,
  CreditCard,
  Home,
  PieChart,
  Settings,
  User,
  Wallet,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar = ({ onClose }: SidebarProps) => {
  const location = useLocation();
  const { logout } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex h-full flex-col bg-white shadow-sm">
      <div className="flex h-14 items-center border-b px-4">
        <Wallet className="mr-2 h-6 w-6 text-emerald-600" />
        <h1 className="text-lg font-bold text-emerald-600">MoneyBook</h1>
        {onClose && (
          <button
            type="button"
            className="ml-auto rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
        )}
      </div>
      <nav className="flex-1 space-y-1 p-2">
        <Link
          to="/"
          className={`flex items-center rounded-md px-2 py-2 text-sm font-medium ${
            isActive("/")
              ? "bg-emerald-50 text-emerald-600"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          }`}
        >
          <Home className="mr-3 h-5 w-5 flex-shrink-0" />
          대시보드
        </Link>
        <Link
          to="/expenses"
          className={`flex items-center rounded-md px-2 py-2 text-sm font-medium ${
            isActive("/expenses")
              ? "bg-emerald-50 text-emerald-600"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          }`}
        >
          <CreditCard className="mr-3 h-5 w-5 flex-shrink-0" />
          지출 관리
        </Link>
        <Link
          to="/statistics"
          className={`flex items-center rounded-md px-2 py-2 text-sm font-medium ${
            isActive("/statistics")
              ? "bg-emerald-50 text-emerald-600"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          }`}
        >
          <BarChart3 className="mr-3 h-5 w-5 flex-shrink-0" />
          통계
        </Link>
        <Link
          to="/budget"
          className={`flex items-center rounded-md px-2 py-2 text-sm font-medium ${
            isActive("/budget")
              ? "bg-emerald-50 text-emerald-600"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          }`}
        >
          <PieChart className="mr-3 h-5 w-5 flex-shrink-0" />
          예산 계획
        </Link>

        <div className="border-t border-gray-200 pt-4 mt-4">
          <Link
            to="/settings"
            className={`flex items-center rounded-md px-2 py-2 text-sm font-medium ${
              isActive("/settings")
                ? "bg-emerald-50 text-emerald-600"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <Settings className="mr-3 h-5 w-5 flex-shrink-0" />
            설정
          </Link>
          <Link
            to="/profile"
            className={`flex items-center rounded-md px-2 py-2 text-sm font-medium ${
              isActive("/profile")
                ? "bg-emerald-50 text-emerald-600"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <User className="mr-3 h-5 w-5 flex-shrink-0" />
            프로필
          </Link>
          <button
            onClick={handleLogout}
            className="flex w-full items-center rounded-md px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          >
            <svg
              className="mr-3 h-5 w-5 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            로그아웃
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
