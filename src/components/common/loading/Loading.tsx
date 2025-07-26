import loadingImage from "@/assets/moneybook_loading.png";

export const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9F9FB]">
      <img
        src={loadingImage}
        alt="Moneybook Loading"
        className="w-60 h-auto mb-4 animate-pulse"
      />
    </div>
  );
};
