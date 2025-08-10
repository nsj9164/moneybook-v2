import { useEffect, useState } from "react";
import { IUserProfile } from "../types/UserProfile";
import { supabase } from "@/utils/supabase";
import { UUID } from "@/types/ids";
import { formatKeyCase } from "@/utils/caseConverter";

export const useUserProfile = (userId: UUID | null) => {
  const [profile, setProfile] = useState<IUserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .maybeSingle();

      if (error) {
        console.error("user profile loading failed:", error.message);
        setProfile(null);
      } else {
        const mappedData = formatKeyCase(data, "camel");
        setProfile(mappedData ?? []);
      }

      setLoading(false);
    };

    fetchProfile();
  }, [userId]);

  return { profile, loading };
};
