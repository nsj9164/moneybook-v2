import { CardSection } from "@/components/common/layout/CardSection";
import { formatCurrency } from "@/utils/format";
import { CreditCard } from "lucide-react";
import { motion } from "framer-motion";

export const MonthlyPayment = () => {
  return (
    <CardSection title="결제수단별 지출">
      <div className="space-y-4">
        {paymentMethodData.map((method, index) => (
          <div key={method.name} className="flex items-center justify-between">
            <div className="flex items-center flex-1">
              <CreditCard className="h-4 w-4 text-gray-400 mr-3" />
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    {method.name}
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {formatCurrency(method.value)}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${method.percentage}%` }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="h-2 rounded-full bg-blue-500"
                  />
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-gray-500">
                    {method.percentage}%
                  </span>
                  <ChangeIndicator
                    current={method.value}
                    previous={method.lastMonthValue}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </CardSection>
  );
};
