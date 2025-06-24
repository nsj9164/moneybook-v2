import { ArrowRight } from "lucide-react";

interface SectionTitleProps {
  title: string;
  divClass?: string;
}

export const SectionTitle = ({ title, divClass }: SectionTitleProps) => {
  return (
    <div className={`flex items-center justify-between ${divClass}`}>
      <h2 className="text-lg font-semibold text-gray-800">재정 개요</h2>
      <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center">
        <span>{title}</span>
        <ArrowRight className="ml-1 h-4 w-4" />
      </button>
    </div>
  );
};
