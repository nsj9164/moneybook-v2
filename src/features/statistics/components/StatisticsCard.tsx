import { ReactNode } from "react";

interface CardProps {
  title: string;
  children: ReactNode;
  action?: ReactNode;
}

export const StatisticsCard = ({ title, children, action }: CardProps) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          {action && <>{action}</>}
        </div>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
};
