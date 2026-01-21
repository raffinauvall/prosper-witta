import { supabase } from "@/lib/supabase";
import { success, failure } from "@/lib/api-response";

export async function GET() {
  try {
    const { data, error } = await supabase.from("categories").select("*");

    if (error) {
      console.error("Supabase GET error:", error.message);
      return failure(error.message, 500);
    }

    return success(data);
  } catch (err) {
    console.error("SERVER ERROR:", err);
    return failure("Server error", 500);
  }
}
