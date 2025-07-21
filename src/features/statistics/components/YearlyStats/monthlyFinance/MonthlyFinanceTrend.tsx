import EChartsReact from "echarts-for-react";
import { CardSection } from "@/components/common/layout/CardSection";
import { DetailButton } from "@/components/common/layout/DetailButton";
import { MonthlyFinance } from "../../../types/YearlyStatistics";
import { monthlyFinanceOption } from "./monthlyFinanceOption";

export const MonthlyFinanceTrend = ({
  monthlyFinance,
}: {
  monthlyFinance: MonthlyFinance[];
}) => {
  return (
    <CardSection title="월별 재정 추이" action={<DetailButton />}>
      <EChartsReact option={monthlyFinanceOption(monthlyFinance)} />
    </CardSection>
  );
};
