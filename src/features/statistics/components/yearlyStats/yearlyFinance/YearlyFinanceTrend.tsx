import EChartsReact from "echarts-for-react";
import { CardSection } from "@/components/common/layout/CardSection";
import { YearlyFinance } from "@/features/statistics/types/YearlyStatisticsType";
import { yearlyFinanceOption } from "./yearlyFinanceOption";

export const YearlyFinanceTrend = ({
  yearlyFinance,
}: {
  yearlyFinance: YearlyFinance[];
}) => {
  return (
    <CardSection title="연간 재정 추이">
      <EChartsReact option={yearlyFinanceOption(yearlyFinance)} />
    </CardSection>
  );
};
