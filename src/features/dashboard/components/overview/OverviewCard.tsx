import { formatCurrency } from "@/utils/format";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface OverviewCardProps {
  transition: { duration: number; delay?: number };
  title: string;
  amount: number | string;
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
  children: ReactNode;
}

export const OverviewCard = ({
  transition,
  title,
  amount,
  icon: Icon,
  iconBgColor,
  iconColor,
  children,
}: OverviewCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={transition}
      className="bg-white rounded-xl border border-gray-200 shadow-sm p-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-2">{amount}</h3>
          <div className="flex items-center mt-2">
            {/* <span className="text-sm text-gray-500">{percent}</span> */}
            {children}
          </div>
        </div>
        <div className={`rounded-full p-3 ${iconBgColor}`}>
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
      </div>
    </motion.div>
  );
};
