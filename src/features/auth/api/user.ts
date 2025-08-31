import { UUID } from "@/types/ids";
import { supabase } from "@/utils/supabase";
import { User as SupabaseUser } from "@supabase/supabase-js";

export interface UserEntity {
  id: UUID;
  email: string;
  name: string;
  profile_image: string;
  last_provider: string;
  created_at?: string;
  updated_at?: string;
}

export async function getOrCreateUser(
  supabaseUser: SupabaseUser,
  loginProvider: "kakao" | "google" | null
): Promise<UserEntity | null> {
  console.log("#############", supabaseUser, loginProvider);
  const { id, email, user_metadata } = supabaseUser;

  if (!email) return null;

  const name = user_metadata.full_name || user_metadata.name || "";
  const profileImage = user_metadata.avatar_url || "";

  const { data: existing, error: checkError } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .maybeSingle<UserEntity>();

  if (checkError) {
    console.error("Error checking user:", checkError.message);
    return null;
  }

  if (existing) {
    return existing;
  }

  const { data: inserted, error: insertError } = await supabase
    .from("users")
    .insert({
      id,
      email,
      name,
      profile_image: profileImage,
      provider: loginProvider,
    })
    .select("*")
    .single<UserEntity>();

  if (insertError) {
    console.error("Error inserting user:", insertError);
    return null;
  }

  return inserted;
}
