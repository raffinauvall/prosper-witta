import { verifyAdmin } from "@/lib/authServer";
import { success, failure } from "@/lib/api-response";

export async function GET() {
  try {
    const admin = await verifyAdmin();

    return success({
      name: admin.username,
    });
  } catch {
    return failure("Unauthorized", 401);
  }
}
