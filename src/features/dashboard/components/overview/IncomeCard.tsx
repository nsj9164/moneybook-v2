import { formatCurrency } from "@/utils/format";

export const IncomeCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white rounded-xl border border-gray-200 shadow-sm p-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500">이번 달 수입</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-2">
            {formatCurrency(monthlyIncome)}
          </h3>
          <div className="flex items-center mt-2">
            <ArrowUpRight className="h-4 w-4 text-emerald-500 mr-1" />
            <span className="text-sm font-medium text-emerald-600">5.2%</span>
            <span className="text-sm text-gray-500 ml-1">전월 대비</span>
          </div>
        </div>
        <div className="bg-emerald-50 rounded-full p-3">
          <DollarSign className="h-6 w-6 text-emerald-600" />
        </div>
      </div>
    </motion.div>
  );
};
