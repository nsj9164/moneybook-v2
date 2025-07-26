interface ProfileStatsCardProps {
  title: string;
  desc: string;
}
export const ProfileStatsCard = ({ title, desc }: ProfileStatsCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-gray-900 mt-2">{desc}</p>
    </div>
  );
};
