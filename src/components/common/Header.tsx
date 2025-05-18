import { Plus, Wallet, Bell, Search } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useState } from "react";

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const location = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);

  // 현재 경로에 따라 타이틀 결정
  const getTitle = () => {
    const path = location.pathname;
    if (path === "/") return "대시보드";
    if (path === "/expenses" || path.startsWith("/expenses/"))
      return "지출 관리";
    if (path === "/statistics") return "통계";
    if (path === "/budget") return "예산 계획";
    if (path === "/settings") return "설정";
    if (path === "/profile") return "프로필";
    return "";
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="mx-auto w-full px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <button
              type="button"
              className="mr-3 -ml-1 rounded-md p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
              onClick={onMenuClick}
            >
              <span className="sr-only">메뉴 열기</span>
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <div className="flex items-center">
              <Wallet className="h-6 w-6 text-emerald-600" />
              <h1 className="ml-2 text-lg font-bold text-emerald-600">
                MoneyBook
              </h1>
            </div>
            <div className="ml-6 text-lg font-semibold text-gray-900 hidden lg:block">
              {getTitle()}
            </div>
          </div>

          <div className="flex-1 mx-4 lg:mx-8 max-w-md hidden md:block">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="검색..."
                className="block w-full rounded-md border-gray-300 pl-10 pr-3 py-2 text-sm focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              type="button"
              className="rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <span className="sr-only">알림</span>
              <Bell className="h-6 w-6" />
            </button>

            <button
              type="button"
              className="inline-flex items-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors"
            >
              <Plus className="mr-2 -ml-1 h-4 w-4" />
              지출 추가
            </button>

            <div className="relative">
              <button
                type="button"
                className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <span className="sr-only">사용자 메뉴 열기</span>
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="사용자 프로필"
                />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                  <a
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    프로필
                  </a>
                  <a
                    href="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    설정
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    로그아웃
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
