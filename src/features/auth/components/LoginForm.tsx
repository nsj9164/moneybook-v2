import { Card, CardContent } from "@/components/ui/Card";
import { SocialButton } from "./SocialButton";
import { supabase } from "@/utils/supabase";

export function LoginForm() {
  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: { prompt: "select_account" },
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) console.error("Google login error:", error.message);
  };

  const loginWithKakao = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: {
        queryParams: { prompt: "select_account" },
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) console.error("Kakao login error:", error.message);
  };

  return (
    <Card className="w-full shadow-lg border border-gray-100 overflow-hidden">
      <CardContent className="p-6 space-y-4">
        <SocialButton provider="google" onClick={() => loginWithGoogle()} />
        <SocialButton provider="kakao" onClick={() => loginWithKakao()} />
      </CardContent>
    </Card>
  );
}
