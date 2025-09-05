import {
  ArrowRight,
  BarChart3,
  Plus,
  Shield,
  Smartphone,
  Target,
  Upload,
  Wallet,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const DashboardOnboarding = () => {
  return (
    <div className="h-full">
      {/* 페이지 헤더 */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            MoneyBook에 오신 것을 환영합니다!
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            가계부 관리를 시작하여 더 나은 재정 습관을 만들어보세요.
          </p>
        </div>
      </div>

      {/* 온보딩 메인 콘텐츠 */}
      <div className="p-6">
        {/* 환영 메시지 */}
        <div className="text-center py-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center">
                <Wallet className="h-12 w-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-lg">✨</span>
              </div>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            스마트한 가계부 관리를 시작해보세요
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            MoneyBook과 함께 지출을 체계적으로 관리하고, 목표를 달성하며, 더
            나은 재정 습관을 만들어보세요.
          </p>
        </div>

        {/* 시작하기 옵션들 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* 지출 추가 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6 border border-emerald-200 hover:shadow-lg transition-all cursor-pointer group"
          >
            <Link to="/transactions/edit" className="block">
              <div className="flex items-center justify-center w-12 h-12 bg-emerald-500 rounded-lg mb-4 group-hover:scale-110 transition-transform">
                <Plus className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                첫 거래 추가하기
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                오늘부터 지출과 수입을 기록하고 패턴을 파악해보세요.
              </p>
              <div className="flex items-center text-emerald-600 font-medium text-sm">
                <span>거래 추가</span>
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </motion.div>

          {/* 예산 설정 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200 hover:shadow-lg transition-all cursor-pointer group"
          >
            <Link to="/budget" className="block">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-500 rounded-lg mb-4 group-hover:scale-110 transition-transform">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                예산 계획 세우기
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                카테고리별 예산을 설정하고 목표를 달성해보세요.
              </p>
              <div className="flex items-center text-blue-600 font-medium text-sm">
                <span>예산 설정</span>
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </motion.div>

          {/* 데이터 가져오기 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200 hover:shadow-lg transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-purple-500 rounded-lg mb-4 group-hover:scale-110 transition-transform">
              <Upload className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              기존 데이터 가져오기
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              엑셀 파일이나 다른 가계부 앱에서 데이터를 가져오세요.
            </p>
            <div className="flex items-center text-purple-600 font-medium text-sm">
              <span>파일 업로드</span>
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>
        </div>

        {/* 주요 기능 소개 */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 mb-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              MoneyBook의 주요 기능
            </h3>
            <p className="text-gray-600">
              체계적인 가계부 관리를 위한 모든 기능을 제공합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4 mx-auto">
                <BarChart3 className="h-8 w-8 text-emerald-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">지출 분석</h4>
              <p className="text-sm text-gray-600">
                카테고리별, 기간별 지출 패턴을 시각적으로 분석
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 mx-auto">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">예산 관리</h4>
              <p className="text-sm text-gray-600">
                목표 예산 설정과 실시간 달성률 모니터링
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4 mx-auto">
                <Smartphone className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">간편 입력</h4>
              <p className="text-sm text-gray-600">
                빠르고 쉬운 지출 입력과 자동 카테고리 분류
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4 mx-auto">
                <Shield className="h-8 w-8 text-amber-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">안전한 보관</h4>
              <p className="text-sm text-gray-600">
                클라우드 동기화와 데이터 백업으로 안전하게 보관
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
