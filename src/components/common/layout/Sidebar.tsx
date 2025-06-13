"use client";

import {
  BarChart3,
  CreditCard,
  Home,
  PieChart,
  Settings,
  User,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar = ({ onClose }: SidebarProps) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    { path: "/", name: "대시보드", icon: Home },
    { path: "/expenses", name: "지출 관리", icon: CreditCard },
    { path: "/statistics", name: "통계", icon: BarChart3 },
    { path: "/budget", name: "예산 계획", icon: PieChart },
    { path: "/settings", name: "설정", icon: Settings },
    { path: "/profile", name: "프로필", icon: User },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 py-4">
        <nav className="space-y-1 px-2">
          {menuItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
                onClick={onClose}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 ${
                    isActive ? "text-emerald-600" : "text-gray-500"
                  }`}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* <div className="p-4 border-t border-gray-200">
        <div className="bg-emerald-50 rounded-lg p-3">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-emerald-200 flex items-center justify-center">
                <span className="text-sm font-medium text-emerald-600">P</span>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">
                프리미엄 업그레이드
              </p>
              <p className="text-xs text-gray-500">
                더 많은 기능을 이용해보세요
              </p>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Sidebar;
