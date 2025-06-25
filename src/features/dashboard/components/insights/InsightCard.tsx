import { LucideIcon } from "lucide-react";
import { InsightColor } from "../../constants/InsightColor";

interface InsightCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: InsightColor;
}

export const InsightCard = ({
  icon: Icon,
  title,
  description,
  color,
}: InsightCardProps) => {
  const styles = InsightColor[color];
  return (
    <div className={`${styles.bg} rounded-lg p-4`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <Icon className={`h-5 w-5 ${styles.icon}`} />
        </div>
        <div className="ml-3">
          <h3 className={`text-sm font-medium ${styles.title}`}>{title}</h3>
          <p className={`mt-1 text-xs ${styles.desc}`}>{description}</p>
        </div>
      </div>
    </div>
  );
};
