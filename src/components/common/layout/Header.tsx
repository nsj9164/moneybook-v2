"use client";

import { useState } from "react";
import { Bell, Menu, Search, User, Wallet } from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState("");

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

        <div className="hidden md:flex items-center relative max-w-md w-full mx-4">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-10 p-2.5"
              placeholder="검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 md:hidden">
            <Search className="h-5 w-5" />
          </button>
          <button className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="p-1 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300">
            <User className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
