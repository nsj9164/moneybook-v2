import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TransactionItem } from "./TransactionItem";
import { AlertCircle, ArrowRight, BarChart3, TrendingUp } from "lucide-react";
import { DashboardSectionCard } from "../../layout/DashboardSectionCard";
import { IExpense } from "@/types";

interface TransactionSectionProps {
  recentExpenses: IExpense[];
}

export const TransactionSection = ({
  recentExpenses,
}: TransactionSectionProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* 최근 거래 */}
      <DashboardSectionCard
        title="최근 거래"
        initialX={20}
        delay={0.6}
        linkTo="/expenses"
        linkText="전체 보기"
        className="lg:col-span-2"
      >
        {recentExpenses.map((expense) => (
          <TransactionItem key={expense.id} expense={expense} />
        ))}
      </DashboardSectionCard>

      {/* 인사이트 */}
      <DashboardSectionCard title="인사이트" initialX={20} delay={0.7}>
        {/* 예산 알림 */}
        <div className="bg-amber-50 rounded-lg p-4">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-amber-800">예산 알림</h4>
              <p className="mt-1 text-xs text-amber-700">
                식비 카테고리가 예산의 90%를 사용했습니다.
              </p>
            </div>
          </div>
        </div>

        {/* 지출 패턴 */}
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-start">
            <BarChart3 className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-blue-800">지출 패턴</h4>
              <p className="mt-1 text-xs text-blue-700">
                주말에 지출이 35% 증가했습니다.
              </p>
            </div>
          </div>
        </div>

        {/* 절약 팁 */}
        <div className="bg-emerald-50 rounded-lg p-4">
          <div className="flex items-start">
            <TrendingUp className="h-5 w-5 text-emerald-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-emerald-800">절약 팁</h4>
              <p className="mt-1 text-xs text-emerald-700">
                커피 구매를 줄이면 월 8만원을 절약할 수 있어요.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <Link
            to="/statistics"
            className="w-full text-center text-sm text-emerald-600 font-medium hover:text-emerald-700 flex items-center justify-center"
          >
            더 많은 인사이트 보기
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </DashboardSectionCard>
    </div>
  );
};
