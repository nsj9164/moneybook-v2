import { supabase } from "@/utils/supabase";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthCallback = () => {
  const navigate = useNavigate();
  console.log("✨✨AuthCallback✨✨");
  useEffect(() => {
    const checkUser = async () => {
      const params = new URLSearchParams(window.location.search);
      console.log("params::::", params);
      const provider = params.get("provider");
      console.log("provider:::", provider);

      if (!provider) {
        alert("잘못된 로그인 경로입니다. 다시 시도해주세요.");
        navigate("/login");
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data } = await supabase
          .from("users")
          .select("provider")
          .eq("email", user.email)
          .maybeSingle();

        if (provider && provider !== data?.provider) {
          alert(`이미 ${provider} 계정으로 가입되어 있습니다.`);
          await supabase.auth.signOut();
          navigate("/login");
          return;
        }

        navigate("/", { replace: true });
      } else {
        navigate("/login");
      }
    };

    checkUser();
    console.log("✨✨AuthCallback✨✨");
  }, [navigate]);

  return <p>로그인 처리 중입니다...</p>;
};
