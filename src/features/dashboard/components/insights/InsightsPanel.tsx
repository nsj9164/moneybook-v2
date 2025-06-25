import { AlertCircle, CreditCard, Plus, TrendingUp } from "lucide-react";
import { InsightCard } from "./InsightCard";

export const InsightsPanel = () => {
  const insights = [
    {
      icon: TrendingUp,
      title: "지출 패턴",
      description:
        "주말에 지출이 35% 증가했습니다. 주로 여가 활동에 집중되어 있습니다.",
      color: "blue",
    },
    {
      icon: AlertCircle,
      title: "예산 알림",
      description:
        "식비 카테고리가 예산의 90%를 사용했습니다. 이번 달 지출을 조절해보세요.",
      color: "amber",
    },
    {
      icon: CreditCard,
      title: "절약 팁",
      description:
        "정기 구독 서비스를 검토해보세요. 월 45,000원이 지출되고 있습니다.",
      color: "emerald",
    },
  ] as const;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm lg:col-span-1">
      <div className="px-5 py-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-800">인사이트</h3>
      </div>

      <div className="p-5 space-y-4">
        {insights.map((insight) => (
          <InsightCard
            key={insight.title}
            icon={insight.icon}
            title={insight.title}
            description={insight.description}
            color={insight.color}
          />
        ))}
        <div className="mt-5 pt-4 border-t border-gray-100">
          <button className="w-full text-center text-sm text-emerald-600 font-medium hover:text-emerald-700 flex items-center justify-center">
            <Plus className="mr-1.5 h-4 w-4" />
            맞춤 인사이트 더 보기
          </button>
        </div>
      </div>
    </div>
  );
};
