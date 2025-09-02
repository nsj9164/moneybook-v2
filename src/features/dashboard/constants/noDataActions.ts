import { Plus, Target, BarChart3 } from "lucide-react";
import { ActionCard } from "../types/noDataActions";

export const actionCards: ActionCard[] = [
  {
    to: "/expenses/edit",
    title: "지출 추가",
    description: "오늘의 지출을 빠르게 기록하세요",
    icon: Plus,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-100",
    delay: 0.1,
  },
  {
    to: "/budget",
    title: "예산 설정",
    description: "이번 달 예산을 계획해보세요",
    icon: Target,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100",
    delay: 0.2,
  },
  {
    to: "/statistics",
    title: "지출 통계",
    description: "이전 달 데이터를 분석해보세요",
    icon: BarChart3,
    iconColor: "text-purple-600",
    iconBg: "bg-purple-100",
    delay: 0.3,
  },
];
