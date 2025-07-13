interface CardProps {
  title: string;
  mainValue: string;
  subValue: string;
  description: string;
  mainColorClass: string;
}
export const StatisticsCard = ({
  title,
  mainValue,
  subValue,
  description,
  mainColorClass,
}: CardProps) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="text-center">
        <div className={`text-3xl font-bold ${mainColorClass} mb-2`}>
          {mainValue}
        </div>
        <div className="text-lg text-gray-900 mb-1">{subValue}</div>
        <div className="text-sm text-gray-500">{description}</div>
      </div>
    </div>
  );
};
