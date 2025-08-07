import { supabase } from "@/utils/supabase";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthCallback = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   // 브라우저 렌더링 이후 실행됨 (CSR 환경)
  //   console.log(
  //     Object.getOwnPropertyNames(Object.getPrototypeOf(supabase.auth))
  //   );

  //   console.log("#####before", supabase);
  //   console.log(supabase.auth.getSession); // 함수로 출력됨
  //   console.log(typeof supabase.auth.getSession); // 'function'

  //   const { data: authListener } = supabase.auth.onAuthStateChange(
  //     async (event, session) => {
  //       console.log("🔄 Auth 상태 변경:", event);
  //       console.log("🧾 세션 정보:", session);

  //       if (session?.user) {
  //         console.log("✅ 유저 인증됨 → 홈으로 이동");
  //         navigate("/", { replace: true });
  //       } else {
  //         console.log("❌ 유저 없음 → 로그인 페이지로 이동");
  //         navigate("/login", { replace: true });
  //       }
  //     }
  //   );

  //   // 컴포넌트 unmount 시 cleanup
  //   return () => {
  //     authListener.subscription.unsubscribe();
  //   };
  // }, [navigate]);

  useEffect(() => {
    const checkSession = async () => {
      console.log("111111111");
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log("2222222222");
      if (user) {
        navigate("/", { replace: true });
      } else {
        navigate("/login", { replace: true });
      }
    };

    // delay 1 tick to allow Supabase to store token
    setTimeout(checkSession, 0);
  }, [navigate]);

  return <div>로그인 처리 중입니다...</div>;
};
