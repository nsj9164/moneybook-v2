import { useFetchDashboardSummary } from "../hooks/useFetchDashboardSummary";
import { useAuth } from "@/contexts/AuthContext";
import { useDateFilter } from "@/hooks/useDateFilter";
import { DashboardMain } from "../components/DashboardMain";
import { DashboardOnboarding } from "../components/DashboardOnboarding";

const Dashboard = () => {
  const { userId } = useAuth();
  const summaryData = useFetchDashboardSummary({
    targetDate: new Date("2025-06-28"),
    userId: userId!,
  });
  console.log("#############", summaryData);

  const { firstExpenseYear } = useDateFilter();

  return firstExpenseYear ? (
    <DashboardMain summaryData={summaryData} />
  ) : (
    <DashboardOnboarding />
  );
};

export default Dashboard;
