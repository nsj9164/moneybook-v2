import { supabase } from "@/utils/supabase";
import { useEffect } from "react";
import { User } from "../types/auth";
import { loadUser } from "./useLoadUser";

export const useAuthListener = (
  user: User | null,
  setUser: (u: User | null) => void,
  setIsLoading: (loading: boolean) => void
) => {
  const loginProvider = localStorage.getItem("loginProvider") ?? null;
  useEffect(() => {
    const init = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.user) {
          await loadUser(session.user, loginProvider, setUser, false);
        }
      } catch (err) {
        console.error("초기 세션 로드 실패:", err);
      } finally {
        setIsLoading(false);
      }
    };

    init();

    // auth 상태 변화 시 유저 정보 업데이트
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setIsLoading(true);

        if (session?.user) {
          if (event === "SIGNED_IN") {
            loadUser(session.user, loginProvider, setUser, false);
          } else if (event === "INITIAL_SESSION") {
            if (!user) {
              await loadUser(session.user, loginProvider, setUser, true);
            }
          }
        }

        setIsLoading(false);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);
};
