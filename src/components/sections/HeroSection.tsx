import { FeatureIcon } from "@/components/ui-elements/FeatureIcon";
import { DollarSign, Coins, FileText } from "lucide-react";

export function HeroSection() {
  return (
    <>
      <div className="absolute inset-0 bg-black/20 z-10"></div>
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-20 p-12">
        <div className="max-w-md space-y-6">
          <h1 className="text-4xl font-bold tracking-tight">
            서비스와 함께 더 나은 경험을 시작하세요
          </h1>
          <p className="text-lg opacity-90">
            간편한 소셜 로그인으로 빠르게 시작하고 다양한 기능을 경험해보세요.
          </p>
          <div className="flex items-center space-x-4 pt-4">
            <FeatureIcon icon={DollarSign} />
            <FeatureIcon icon={Coins} />
            <FeatureIcon icon={FileText} />
          </div>
        </div>
      </div>
      <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-white/10 rounded-full"></div>
      <div className="absolute top-32 -left-16 w-80 h-80 bg-white/10 rounded-full"></div>
      {/* 배경 이미지 대신 CSS 배경 사용 */}
      <div
        className="absolute inset-0 bg-[url('/background.jpg')] bg-cover bg-center opacity-20 mix-blend-overlay"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070')",
        }}
      ></div>
    </>
  );
}
