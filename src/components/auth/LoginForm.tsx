import { useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { SocialButton } from "./SocialButton";
import { Divider } from "@/components/ui-elements/Divider";
import { ActionButtons } from "./ActionButtons";
import { useAuth } from "@/contexts/AuthContext";

export function LoginForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { loginWithGoogle, loginWithKakao } = useAuth();

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    await loginWithGoogle();
    setIsLoading(false);
  };

  const handleKakaoLogin = async () => {
    setIsLoading(true);
    await loginWithKakao();
    setIsLoading(false);
  };

  return (
    <Card className="w-full shadow-lg border border-gray-100 overflow-hidden">
      <CardContent className="p-6 space-y-4">
        <SocialButton
          provider="google"
          onClick={handleGoogleLogin}
          disabled={isLoading}
        />
        <SocialButton
          provider="kakao"
          onClick={handleKakaoLogin}
          disabled={isLoading}
        />
        <Divider text="또는" />
        <ActionButtons isLoading={isLoading} />
      </CardContent>
    </Card>
  );
}
