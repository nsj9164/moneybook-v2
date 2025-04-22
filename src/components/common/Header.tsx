import { useAuth } from "@/contexts/AuthContext";
import { Plus, Wallet } from "lucide-react";
import { Link } from "react-router-dom";

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const { user } = useAuth();
  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm">
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex h-16 items-center justify-between px-4 lg:px-8">
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
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/expenses/add"
              className="inline-flex items-center rounded-md border border-transparent bg-emerald-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors"
            >
              <Plus className="mr-2 -ml-1 h-4 w-4" />
              지출 추가
            </Link>
            <div className="flex items-center">
              <div className="relative">
                <button
                  type="button"
                  className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                >
                  <span className="sr-only">사용자 메뉴 열기</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src={
                      user?.profileImage ||
                      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    }
                    alt="사용자 프로필"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
