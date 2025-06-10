import { AlertCircle, ArrowRight } from "lucide-react";
import { adviceStyleMap, AdviceType } from "../constants/BudgetConstants";

interface AdviceCardProps {
  type: AdviceType;
  title: string;
  desc: string;
  buttonLabel: string;
}

export const AdviceCard = ({
  type,
  title,
  desc,
  buttonLabel,
}: AdviceCardProps) => {
  const adviceStyle = adviceStyleMap[type];
  return (
    <div className="bg-yellow-50 rounded-lg p-4">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <AlertCircle className={`h-5 w-5 ${adviceStyle.textColor}`} />
        </div>
        <div className="ml-3">
          <h3 className={`text-sm font-medium ${adviceStyle.titleColor}`}>
            {title}
          </h3>
          <p className={`mt-1 text-xs ${adviceStyle.descColor}`}>{desc}</p>
          <button
            className={`mt-2 text-xs ${adviceStyle.textColor} font-medium hover:text-yellow-700 flex items-center`}
          >
            {buttonLabel}
            <ArrowRight className="ml-1 h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
