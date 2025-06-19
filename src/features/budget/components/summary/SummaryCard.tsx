interface SummaryCardProps {
  title: string;
  value: string;
  colorClass: string;
  footerLabel: string;
  footerValue: string;
  progressClass?: string;
  progress?: number;
  children?: React.ReactNode;
}
export const SummaryCard = ({
  title,
  value,
  colorClass,
  footerLabel,
  footerValue,
  progressClass,
  progress,
  children,
}: SummaryCardProps) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <h3 className={`text-2xl font-bold text-gray-900 mt-2 ${colorClass}`}>
        {value}
      </h3>
      <div className="mt-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-medium text-gray-500">
            {footerLabel}
          </span>
          <span className="text-xs font-medium text-gray-700">
            {footerValue}
          </span>
        </div>
        {progress !== undefined && (
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${progressClass}`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}
        {children && (
          <div className="text-xs text-gray-500 mt-2">{children}</div>
        )}
      </div>
    </div>
  );
};
