import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { verifyAdmin } from "@/lib/authServer";
import { success, failure } from "@/lib/api-response";
import { extensionForImage, isAllowedImageFile, isWithinSize } from "@/lib/uploadValidation";

export async function POST(req: Request) {
  try {
    await verifyAdmin();

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return failure("No file", 400);
    }

    if (!isAllowedImageFile(file)) {
      return failure("Only JPG, PNG, and WEBP images are allowed", 400);
    }

    if (!isWithinSize(file, 5)) {
      return failure("Image must be 5MB or smaller", 400);
    }

    const ext = extensionForImage(file);
    if (!ext) {
      return failure("Unsupported image type", 400);
    }

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
