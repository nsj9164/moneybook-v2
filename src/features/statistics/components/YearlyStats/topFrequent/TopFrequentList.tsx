import { CardSection } from "@/components/common/layout/CardSection";
import { TopItem } from "../../../types/YearlyStatistics";
import { TopFrequentItem } from "./TopFrequentItem";

export const TopFrequentList = ({ topItems }: { topItems: TopItem[] }) => {
  return (
    <CardSection title="소비가 잦은 항목 TOP 3">
      <div className="space-y-4">
        {topItems.map((item, index) => (
          <TopFrequentItem key={item.itemName} topItem={item} index={index} />
        ))}
      </div>
    </CardSection>
  );
};
