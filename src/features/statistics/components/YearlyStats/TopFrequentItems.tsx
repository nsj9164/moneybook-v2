export const TopFrequentItems = () => {
  return (
    <CardSection title="소비가 잦은 항목 TOP 3">
      <div className="space-y-4">
        {yearlyStats.frequentItems.map((item, index) => (
          <div
            key={item.name}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
                {index + 1}
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">
                  {item.name}
                </div>
                <div className="text-xs text-gray-500">{item.count}회 이용</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-gray-900">
                {formatCurrency(item.amount)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </CardSection>
  );
};
