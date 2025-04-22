"use client";

import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import Header from "../components/common/Header";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* 모바일 사이드바 */}
      <div className="fixed inset-0 z-40 hidden lg:hidden">
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        <div className="fixed inset-y-0 left-0 flex w-full max-w-xs flex-col bg-white">
          <Sidebar onClose={() => {}} />
        </div>
      </div>

      {/* 데스크톱 사이드바 */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <Sidebar />
      </div>

      {/* 메인 콘텐츠 */}
      <div className="flex flex-1 flex-col lg:pl-64">
        <Header onMenuClick={() => {}} />
        <main className="flex-1">
          <div className="mx-auto w-full max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
