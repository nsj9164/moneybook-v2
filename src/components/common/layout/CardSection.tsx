interface CardSectionProps {
  title: string;
  className?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}

export const CardSection = ({
  title,
  action,
  className,
  children,
}: CardSectionProps) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          {action && <div>{action}</div>}
        </div>
      </div>
      <div className={`p-6 ${className}`}>{children}</div>
    </div>
  );
};
