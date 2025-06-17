import { BrandLogo } from "@/components/ui-elements/BrandLogo";
import { TermsNotice } from "@/components/ui-elements/TermsNotice";
import { LoginForm } from "@/features/auth/components/LoginForm";

export function AuthSection() {
  return (
    <>
      <div className="mb-8 text-center">
        <BrandLogo />
        <h2 className="text-2xl font-bold text-gray-900">서비스 이름</h2>
        <p className="text-gray-500 mt-1">
          간편하게 로그인하고 서비스를 이용해보세요
        </p>
      </div>
      <LoginForm />
      <TermsNotice />
    </>
  );
}
