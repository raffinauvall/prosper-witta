import { supabase } from "../supabase";

export async function uploadNewsImage(file: File) {
  const ext = file.type.split("/")[1] || "jpg";
  const fileName = `${Date.now()}.${ext}`;
  const path = `news/thumbnails/${fileName}`;

  const { error } = await supabase.storage
    .from("news-assets")
    .upload(path, file, { upsert: false });

  if (error) throw error;

  const { data } = supabase.storage
    .from("news-assets")
    .getPublicUrl(path);

  return data.publicUrl;
}
