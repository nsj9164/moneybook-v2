import { CardSection } from "@/components/common/layout/CardSection";
import { TopCategory } from "../../../types/YearlyStatistics";
import { TopSpendingCategoriesItem } from "./TopSpendingCategoriesItem";

export const TopSpendingCategories = ({
  topCategories,
}: {
  topCategories: TopCategory[];
}) => {
  const total = topCategories.reduce((acc, cur) => acc + cur.amount, 0);
  return (
    <CardSection title="소비가 높은 카테고리 TOP 3">
      <div className="space-y-4">
        {topCategories.map((category, index) => {
          const widthPercent =
            total > 0 ? Math.round((category.amount / total) * 100) : 0;
          return (
            <TopSpendingCategoriesItem
              category={category}
              widthPercent={widthPercent}
              index={index}
            />
          );
        })}
      </div>
    </CardSection>
  );
};
