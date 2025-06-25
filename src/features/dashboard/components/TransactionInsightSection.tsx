import { InsightsPanel } from "./insights/InsightsPanel";
import { RecentTransactions } from "./transactions/RecentTransactions";

export const TransactionInsightSection = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* 최근 거래 내역 */}
      <RecentTransactions />

      {/* 인사이트 및 팁 */}
      <InsightsPanel />
    </div>
  );
};
