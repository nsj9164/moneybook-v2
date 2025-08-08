import { supabase } from "@/utils/supabase";
import { User as SupabaseUser } from "@supabase/supabase-js";

export async function getOrCreateUser(supabaseUser: SupabaseUser) {
  const { email, user_metadata, app_metadata } = supabaseUser;

  if (!email) return null;

  const name = user_metadata.full_name || user_metadata.name || "";
  const profileImage = user_metadata.avatar_url || "";
  const provider = app_metadata?.provider || "unknown";

  const { data: existing, error: checkError } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .eq("provider", provider)
    .single();

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
      email,
      name,
      profile_image: profileImage,
      provider,
    })
    .select("*")
    .single();

  if (insertError) {
    console.error("Error inserting user:", insertError);
    return null;
  }

  return inserted;
}
