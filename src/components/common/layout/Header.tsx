import { Menu, User, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        <div className="flex items-center">
          <button
            className="mr-4 p-2 rounded-lg text-gray-500 hover:bg-gray-100 lg:hidden"
            onClick={onMenuClick}
            aria-label="메뉴 열기"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center">
            <Wallet className="h-6 w-6 text-emerald-600" />
            <h1 className="ml-2 text-lg font-bold text-emerald-600">
              MoneyBook
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* <button className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 md:hidden">
            <Search className="h-5 w-5" />
          </button>
          <button className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button> */}
          <button
            onClick={() => navigate("/profile")}
            className="p-1 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            <User className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
