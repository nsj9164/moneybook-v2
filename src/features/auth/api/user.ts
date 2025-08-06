import { UUID } from "@/types/ids";
import { supabase } from "@/utils/supabase";
import { User as SupabaseUser } from "@supabase/supabase-js";

export async function getOrCreateUser(supabaseUser: SupabaseUser) {
  const { email, user_metadata, app_metadata } = supabaseUser;
  const provider = app_metadata?.provider ?? "unknown";

  if (!email) return null;

  const name = user_metadata?.name ?? user_metadata?.full_name ?? "";
  const profileImage =
    user_metadata?.avatar_url ?? user_metadata?.picture ?? undefined;

  const { data: existing, error: checkError } = await supabase
    .from("users")
    .select("id")
    .eq("email", email)
    .eq("provider", provider)
    .limit(1);

  if (checkError) {
    console.error("Error checking user:", checkError.message);
    return null;
  }

  if (existing && existing.length > 0) {
    return {
      id: existing[0].id as UUID,
      email,
      name,
      profileImage,
      provider,
    };
  }

  const { data: inserted, error: insertError } = await supabase
    .from("users")
    .insert({
      email,
      name,
      profile_image: profileImage,
      provider,
    })
    .select("id")
    .single();

  if (insertError || !inserted) {
    console.error("Error inserting user:", insertError?.message);
    return null;
  }

  return {
    id: inserted.id,
    email,
    name,
    profileImage,
    provider,
  };
}
