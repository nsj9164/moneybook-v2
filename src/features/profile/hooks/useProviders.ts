import { ProviderType } from "@/features/auth/types/auth";
import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";

export const useProviders = () => {
  const [providers, setProviders] = useState<ProviderType[]>([]);

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setProviders(session?.user.app_metadata.providers ?? []);
    };
    fetchSession();
  }, []);

  return providers;
};
