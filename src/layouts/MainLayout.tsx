"use client";

import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import Header from "../components/common/Header";

const MainLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* 모바일 사이드바 */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-75"
            onClick={toggleMobileMenu}
          />
          <div className="fixed inset-y-0 left-0 flex w-full max-w-xs flex-col bg-white">
            <Sidebar onClose={toggleMobileMenu} />
          </div>
        </div>
      )}

      {/* 데스크톱 사이드바 */}
      <div className="hidden lg:flex lg:w-72 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex h-full flex-col overflow-hidden border-r border-gray-200 bg-white">
          <Sidebar />
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="flex flex-1 flex-col lg:pl-72">
        <Header onMenuClick={toggleMobileMenu} />
        <main className="flex-1">
          <div className="mx-auto w-full max-w-[1400px] px-2 sm:px-4 lg:px-6 py-6">
            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="h-full">
                <Outlet />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
