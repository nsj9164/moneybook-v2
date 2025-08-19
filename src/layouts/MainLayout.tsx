import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/layout/Sidebar";
import Header from "../components/common/layout/Header";

const MainLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // const [isMobile, setIsMobile] = useState(false);

  // // 반응형 처리를 위한 윈도우 크기 감지
  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsMobile(window.innerWidth < 1024);
  //   };

  //   handleResize();
  //   window.addEventListener("resize", handleResize);

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* 헤더 영역 */}
      <Header onMenuClick={toggleMobileMenu} />

      {/* 메인 영역 (사이드바 + 콘텐츠) */}
      <div className="flex flex-1 overflow-hidden">
        {/* 모바일 사이드바 오버레이 */}
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
        <div className="hidden lg:block w-64 flex-shrink-0 overflow-y-auto bg-white m-4 rounded-xl shadow-sm">
          <Sidebar />
        </div>

        {/* 콘텐츠 영역 */}
        <div className="flex-1 overflow-auto p-4">
          <div className="bg-white rounded-xl shadow-sm h-full overflow-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
