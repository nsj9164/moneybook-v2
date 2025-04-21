import { supabase } from "@/utils/supabase";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthCallback = () => {
  const navigate = useNavigate();
  console.log("??????????????????");

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        navigate("/");
      } else {
        navigate("/login");
      }
    };
    checkUser();
  }, [navigate]);

  return <p>로그인 처리 중입니다...</p>;
};
