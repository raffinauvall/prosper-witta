import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { verifyAdmin } from "@/lib/authServer";
import { success, failure } from "@/lib/api-response";

export async function POST(req: Request) {
  try {
    await verifyAdmin();

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return failure("No file", 400);
    }

    const ext = file.name.split(".").pop();
    const fileName = `news/${crypto.randomUUID()}.${ext}`;

    const { error: uploadError } = await supabaseAdmin.storage
      .from("news-assets")
      .upload(fileName, file, { upsert: true });

    if (uploadError) {
      console.error("UPLOAD ERROR:", uploadError);
      return failure(uploadError.message);
    }

    const { data } = supabaseAdmin.storage
      .from("news-assets")
      .getPublicUrl(fileName);

    return success({
      url: data.publicUrl,
    });
  } catch (err) {
    console.error("ADMIN API ERROR:", err);
    return failure("Unauthorized", 401);
  }
}
