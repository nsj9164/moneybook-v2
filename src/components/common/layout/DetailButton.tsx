import { ArrowRight } from "lucide-react";

export const DetailButton = ({ onClick }: { onClick?: () => void }) => {
  return (
    <button
      className="text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center"
      onClick={onClick}
    >
      <span>상세 보기</span>
      <ArrowRight className="ml-1 h-4 w-4" />
    </button>
  );
};
