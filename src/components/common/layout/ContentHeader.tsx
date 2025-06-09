import { ReactNode } from "react";

interface ContentHeaderProps {
  title: string;
  desc: string;
  children: ReactNode;
}
export const ContentHeader = ({
  title,
  desc,
  children,
}: ContentHeaderProps) => {
  return (
    <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <p className="mt-1 text-sm text-gray-500">{desc}</p>
      </div>
      {children}
    </div>
  );
};
