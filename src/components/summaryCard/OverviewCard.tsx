import { ChangeIndicator } from "@/features/statistics/components/ChangeIndicator";
import { ReactNode } from "react";

interface OverviewCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  valueColor: string;
  ratio: number;
  isIncrease?: boolean;
  children?: ReactNode;
}

export default function OverviewCard({
  icon,
  label,
  value,
  valueColor,
  ratio,
  isIncrease,
  children,
}: OverviewCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 min-h-[100px]">
      <div className="flex items-center">
        <div className="flex-shrink-0">{icon}</div>
        <div className="ml-4 flex-1">
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <h3 className={`text-2xl font-bold ${valueColor}`}>{value}</h3>

          <div className="mt-1">
            <ChangeIndicator ratio={ratio} isIncrease={isIncrease} />
          </div>
          {children && <div>{children}</div>}
        </div>
      </div>
    </div>
  );
}
