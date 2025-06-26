import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description: string;
  children: ReactNode;
}
export const PageHeader = ({
  title,
  description,
  children,
}: PageHeaderProps) => {
  return (
    <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>
      {children && (
        <div className="flex items-center space-x-3">{children}</div>
      )}
    </div>
  );
};
