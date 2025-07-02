import { useState } from "react";
import { useFetchDashboardSummary } from "../hooks/useFetchDashboardSummary";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const { userId } = useAuth();
  const summaryData = useFetchDashboardSummary({
    targetDate: new Date("2025-06-28"),
    userId: userId!,
  });
  console.log("#############", summaryData);

  // 데이터 존재 여부 확인
  const [hasData, setHasData] = useState(true);

  return hasData ? <DashboardMain /> : <DashboardOnboarding />;
};

export default Dashboard;
