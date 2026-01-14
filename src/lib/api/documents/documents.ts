import { DocumentStatus } from "@/lib/types";

export async function getProductDocumentStatus(
  productId: number
): Promise<DocumentStatus> {
  const res = await fetch(`/api/products/${productId}/documents`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch document status");
  }

  return res.json();
}