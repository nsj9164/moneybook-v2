import clsx from "clsx";

interface ProfileInfoCardProps {
  title: string;
  desc: string;
  styleClass?: string;
}

export const ProfileInfoCard = ({
  title,
  desc,
  styleClass,
}: ProfileInfoCardProps) => {
  return (
    <div className={clsx(styleClass)}>
      <label className="block text-sm font-medium text-gray-700">{title}</label>
      <p className="mt-2 text-sm text-gray-900 p-3 bg-gray-50 rounded-lg">
        {desc}
      </p>
    </div>
  );
};
