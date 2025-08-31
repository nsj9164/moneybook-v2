import { Card, CardContent } from "@/components/ui/Card";
import { SocialButton } from "./SocialButton";
import { supabase } from "@/utils/supabase";

export function LoginForm() {
  const loginWithProvider = async (provider: "kakao" | "google") => {
    localStorage.setItem("loginProvider", provider);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        queryParams: { prompt: "select_account" },
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) console.error(`${provider} login error:`, error.message);
  };

  return (
    <Card className="w-full shadow-lg border border-gray-100 overflow-hidden">
      <CardContent className="p-6 space-y-4">
        <SocialButton
          provider="google"
          onClick={() => loginWithProvider("google")}
        />
        <SocialButton
          provider="kakao"
          onClick={() => loginWithProvider("kakao")}
        />
      </CardContent>
    </Card>
  );
}
