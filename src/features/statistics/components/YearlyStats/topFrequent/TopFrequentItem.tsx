import { TopItem } from "@/features/statistics/types/YearlyStatisticsType";
import { formatCurrency } from "@/utils/format";

interface TopFrequentItemProps {
  topItem: TopItem;
  index: number;
}

export const TopFrequentItem = ({ topItem, index }: TopFrequentItemProps) => {
  const { itemName, count, amount } = topItem;
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
          {index + 1}
        </div>
        <div>
          <div className="text-sm font-medium text-gray-900">{itemName}</div>
          <div className="text-xs text-gray-500">{count}회 이용</div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-sm font-bold text-gray-900">
          {formatCurrency(amount)}
        </div>
      </div>
    </div>
  );
};
