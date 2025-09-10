import { ReactNode } from "react";

interface FilterSummaryItemProps {
  children: ReactNode;
  label: string;
  valueClassName: string;
  value: number | string;
}

export const FilterSummaryItem = ({
  children,
  label,
  valueClassName,
  value,
}: FilterSummaryItemProps) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="flex items-center">
        <div className="flex-shrink-0">{children}</div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <p className={`text-lg font-semibold ${valueClassName}`}>{value}건</p>
        </div>
      </div>
    </div>
  );
};
