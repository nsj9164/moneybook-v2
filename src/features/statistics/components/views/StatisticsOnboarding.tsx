import {
  Award,
  BarChart3,
  Calendar,
  Clock,
  Eye,
  PieChart,
  Plus,
  Target,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const StatisticsOnboarding = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl"
      >
        {/* 메인 메시지 */}
        <div className="mb-12">
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <BarChart3 className="w-12 h-12 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            지출을 추가하면 이런 통계화면을 볼 수 있어요!
          </h2>
          <p className="text-gray-600 text-lg">
            첫 번째 지출을 기록하고 나만의 소비 패턴을 분석해보세요.
          </p>
        </div>

        {/* 기능 미리보기 카드들 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 text-center"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">월간/연간 분석</h3>
            <p className="text-sm text-gray-600">
              기간별 수입과 지출을 비교하고 저축률을 추적할 수 있어요
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 text-center"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <PieChart className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              카테고리별 분석
            </h3>
            <p className="text-sm text-gray-600">
              어떤 항목에 가장 많이 지출하는지 한눈에 확인할 수 있어요
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 text-center"
          >
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">무지출 캘린더</h3>
            <p className="text-sm text-gray-600">
              무지출일을 캘린더에서 확인하고 패턴을 분석해보세요
            </p>
          </motion.div>
        </div>

        {/* 상세 기능 설명 */}
        <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-8 mb-12">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            이런 인사이트를 얻을 수 있어요
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <Eye className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  지출 패턴 분석
                </h4>
                <p className="text-sm text-gray-600">
                  언제, 어디서, 얼마나 지출하는지 상세한 패턴을 파악할 수 있어요
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <Target className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  예산 대비 성과
                </h4>
                <p className="text-sm text-gray-600">
                  설정한 예산 목표 대비 실제 지출을 비교 분석해요
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <Award className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  저축률 추이
                </h4>
                <p className="text-sm text-gray-600">
                  시간에 따른 저축률 변화를 추적하고 개선점을 찾아요
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <Clock className="w-4 h-4 text-orange-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  장기 트렌드 분석
                </h4>
                <p className="text-sm text-gray-600">
                  연간 재정 상태 변화를 통해 장기적인 계획을 세워요
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className="flex justify-center mb-12">
          <button
            onClick={() => navigate("/transactions/edit")}
            className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5 mr-2" />첫 번째 지출 추가하기
          </button>
        </div>

        {/* 도움말 섹션 */}
        <div className="text-center">
          <h4 className="text-lg font-semibold text-gray-900 mb-6">
            💡 가계부 작성 팁
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="text-3xl mb-3">📝</div>
              <p className="text-gray-600">
                <strong>매일 기록하기</strong>
                <br />
                작은 지출도 놓치지 말고 꾸준히 기록해보세요
              </p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="text-3xl mb-3">🏷️</div>
              <p className="text-gray-600">
                <strong>카테고리 활용</strong>
                <br />
                지출을 카테고리별로 분류하면 패턴을 쉽게 파악할 수 있어요
              </p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="text-3xl mb-3">🎯</div>
              <p className="text-gray-600">
                <strong>목표 설정하기</strong>
                <br />
                월간 예산을 설정하고 목표 달성을 위해 노력해보세요
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
