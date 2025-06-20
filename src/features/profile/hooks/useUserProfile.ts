import { useEffect, useState } from "react";
import { IUserProfile } from "../types/UserProfile";
import { supabase } from "@/utils/supabase";
import { UUID } from "@/types/ids";

export const useUserProfile = (userId: UUID | null, provider?: string) => {
  const [profile, setProfile] = useState<IUserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .eq("provider", provider)
        .single();

      if (error) {
        console.error("user profile loading failed:", error.message);
        setProfile(null);
      } else {
        setProfile(data);
      }

      setLoading(false);
    };

    fetchProfile();
  }, [userId]);

  return { profile, loading };
};
