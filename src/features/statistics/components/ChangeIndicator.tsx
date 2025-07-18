import { ArrowDown, ArrowUp, Minus } from "lucide-react";

export const ChangeIndicator = ({
  ratio,
  isIncrease,
}: {
  ratio: number;
  isIncrease?: boolean;
}) => {
  if (ratio === 0) {
    return (
      <div className="flex items-center text-xs text-gray-500">
        <Minus className="w-3 h-3 mr-1" />
        <span>변화없음</span>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center text-xs ${
        isIncrease ? "text-emerald-500" : "text-red-500"
      }`}
    >
      {isIncrease ? (
        <ArrowUp className="w-3 h-3 mr-1" />
      ) : (
        <ArrowDown className="w-3 h-3 mr-1" />
      )}
      <span>{Math.abs(ratio)}%</span>
    </div>
  );
};
