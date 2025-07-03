import { motion } from "framer-motion";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface DashboardSectionCardProps {
  initialX?: number;
  delay?: number;
  title: string;
  children: ReactNode;
  linkTo?: string;
  linkText?: string;
  className?: string;
}

export const DashboardSectionCard = ({
  initialX = -20,
  delay = 0.4,
  title,
  children,
  linkTo,
  linkText,
  className,
}: DashboardSectionCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: initialX }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`bg-white rounded-xl border border-gray-200 shadow-sm p-6 ${className}`}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {linkTo && linkText && (
          <Link
            to={linkTo}
            className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
          >
            {linkText}
          </Link>
        )}
      </div>
      <div className="space-y-4">{children}</div>
    </motion.div>
  );
};
