import { ChangeIndicator } from "@/components/summaryCard/ChangeIndicator";
import { ReactNode } from "react";

interface OverviewCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  valueColor: string;
  ratio: number;
  isIncrease?: boolean;
  children?: ReactNode;
  hasData?: boolean;
}

export default function OverviewCard({
  icon,
  label,
  value,
  valueColor,
  ratio,
  isIncrease,
  children,
  hasData = true,
}: OverviewCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 relative">
      <div className="absolute top-3 right-3">
        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
      </div>
      <div className="flex items-center">
        <div className="flex-shrink-0">{icon}</div>
        <div className="ml-4 flex-1">
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <h3
            className={`text-2xl font-bold ${
              hasData ? valueColor : `text-gray-400`
            }`}
          >
            {value}
          </h3>

          {children ? (
            <div>{children}</div>
          ) : (
            <div className="mt-1">
              <ChangeIndicator ratio={ratio} isIncrease={isIncrease} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
