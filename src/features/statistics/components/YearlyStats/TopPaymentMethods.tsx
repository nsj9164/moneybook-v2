export const TopPaymentMethods = () => {
  return (
    <CardSection title="많이 사용한 결제수단 TOP 3">
      <div className="space-y-4">
        {yearlyStats.topPaymentMethods.map((method, index) => (
          <div key={method.name} className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
              {index + 1}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">
                  {method.name}
                </span>
                <span className="text-sm font-medium text-gray-900">
                  {formatCurrency(method.amount)}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${method.percentage}%` }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </CardSection>
  );
};
