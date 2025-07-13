import { formatCurrency } from "@/utils/format";

interface StatCardProps {
  title: string;
  item: string;
  amount: number;
  date: string;
}
export const StatCard = ({ title, item, amount, date }: StatCardProps) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="text-center">
        <div className="text-lg font-bold text-purple-600 mb-2">{item}</div>
        <div className="text-2xl font-bold text-gray-900 mb-1">
          {formatCurrency(amount)}
        </div>
        <div className="text-sm text-gray-500">{date}</div>
      </div>
    </div>
  );
};
