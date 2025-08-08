import { supabase } from "@/utils/supabase";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        navigate("/", { replace: true });
      } else {
        navigate("/login", { replace: true });
      }
    };

    checkSession();
  }, [navigate]);

  return <div>로그인 처리 중입니다...</div>;
};
