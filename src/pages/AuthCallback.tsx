import { supabase } from "@/utils/supabase";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const params = new URLSearchParams(window.location.search);
      const provider = params.get("provider");

      if (!provider) {
        alert("잘못된 로그인 경로입니다. 다시 시도해주세요.");
        navigate("/login");
        return;
      }
      sessionStorage.setItem("provider", provider);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        navigate("/", { replace: true });
      } else {
        navigate("/login");
      }
    };

    checkUser();
  }, [navigate]);

  return <p>로그인 처리 중입니다...</p>;
};
