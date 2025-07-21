import { CardSection } from "@/components/common/layout/CardSection";
import { TopPaymentMethod } from "../../../types/YearlyStatistics";
import { TopPaymentMethodItem } from "./TopPaymentMethodItem";

export const TopPaymentMethods = ({
  topPaymentMethods,
}: {
  topPaymentMethods: TopPaymentMethod[];
}) => {
  return (
    <CardSection title="많이 사용한 결제수단 TOP 3">
      <div className="space-y-4">
        {topPaymentMethods.map((method, index) => (
          <TopPaymentMethodItem
            key={method.name}
            method={method}
            index={index}
          />
        ))}
      </div>
    </CardSection>
  );
};
