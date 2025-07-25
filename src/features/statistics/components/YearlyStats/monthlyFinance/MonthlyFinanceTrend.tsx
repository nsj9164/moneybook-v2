import EChartsReact from "echarts-for-react";
import { CardSection } from "@/components/common/layout/CardSection";
import { MonthlyFinance } from "../../../types/YearlyStatistics";
import { monthlyFinanceOption } from "./monthlyFinanceOption";

export const MonthlyFinanceTrend = ({
  monthlyFinance,
}: {
  monthlyFinance: MonthlyFinance[];
}) => {
  return (
    <CardSection title="월별 재정 추이">
      <EChartsReact option={monthlyFinanceOption(monthlyFinance)} />
    </CardSection>
  );
};
