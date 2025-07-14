import { ArrowDown, ArrowUp, Minus } from "lucide-react";

export const ChangeIndicator = ({
  current,
  previous,
  isPositiveGood = false,
}: {
  current: number;
  previous: number;
  isPositiveGood?: boolean;
}) => {
  const getChangePercentage = (current: number, previous: number) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  const change = current - previous;
  const changePercent = getChangePercentage(current, previous);

  if (change === 0) {
    return (
      <div className="flex items-center text-xs text-gray-500">
        <Minus className="w-3 h-3 mr-1" />
        <span>변화없음</span>
      </div>
    );
  }

  const isIncrease = change > 0;
  const isGood = isPositiveGood ? isIncrease : !isIncrease;

  return (
    <div
      className={`flex items-center text-xs ${
        isGood ? "text-emerald-500" : "text-red-500"
      }`}
    >
      {isIncrease ? (
        <ArrowUp className="w-3 h-3 mr-1" />
      ) : (
        <ArrowDown className="w-3 h-3 mr-1" />
      )}
      <span>{Math.abs(changePercent).toFixed(1)}%</span>
    </div>
  );
};
