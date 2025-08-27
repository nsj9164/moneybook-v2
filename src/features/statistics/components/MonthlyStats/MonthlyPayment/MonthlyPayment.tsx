import { CardSection } from "@/components/common/layout/CardSection";
import { PaymentMethodSummary } from "../../../types/MonthlyStatisticsType";
import { MonthlyPaymentItem } from "./MonthlyPaymentItem";

export const MonthlyPayment = ({
  paymentMethods,
}: {
  paymentMethods: PaymentMethodSummary[];
}) => {
  return (
    <CardSection title="결제수단별 지출">
      <div className="space-y-4">
        {paymentMethods.map((method, index) => (
          <MonthlyPaymentItem
            key={method.methodId}
            methodData={method}
            index={index}
          />
        ))}
      </div>
    </CardSection>
  );
};
