import { Plus, Wallet, Bell, Search } from "lucide-react";
import { useLocation } from "react-router-dom";

interface HeaderProps {
  onMenuClick: () => void;
  scrolled?: boolean;
}

const Header = ({ onMenuClick, scrolled = false }: HeaderProps) => {
  const location = useLocation();

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
    <header
      className={`sticky top-0 z-10 transition-all duration-200 ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-white"
      }`}
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex h-16 items-center justify-between px-4 lg:px-8">
          <div className="flex items-center">
            <button
              type="button"
              className="mr-3 -ml-1 rounded-full p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
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
              <Wallet className="h-7 w-7 text-emerald-600" />
              <h1 className="ml-2 text-lg font-bold text-emerald-600">
                MoneyBook
              </h1>
            </div>
            <div className="ml-6 text-lg font-semibold text-gray-900 hidden sm:block">
              {getTitle()}
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* 검색 버튼 */}
            <button
              type="button"
              className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">검색</span>
            </button>

            {/* 알림 버튼 */}
            <button
              type="button"
              className="rounded-full p-2 text-gray-500 hover:bg-gray-100 relative"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
              <span className="sr-only">알림</span>
            </button>

            {/* 지출 추가 버튼 */}
            <button
              type="button"
              className="inline-flex items-center rounded-full border border-transparent bg-emerald-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors"
            >
              <Plus className="mr-1 -ml-0.5 h-4 w-4" />
              <span className="hidden sm:inline">지출 추가</span>
            </button>

            {/* 프로필 버튼 */}
            <div className="flex items-center">
              <button
                type="button"
                className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                <span className="sr-only">사용자 메뉴 열기</span>
                <img
                  className="h-8 w-8 rounded-full object-cover border-2 border-white shadow-sm"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="사용자 프로필"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
