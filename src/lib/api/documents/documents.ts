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

  const json = await res.json();

  const data = json?.data ?? json;

  return {
    msds: Boolean(data?.msds),
    tds: Boolean(data?.tds),
  };
}

export async function getProductDocumentAvailability(
  productId: number
): Promise<DocumentStatus> {
  const res = await fetch(
    `/api/document-access/availability?productId=${productId}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch document availability");
  }

  const json = await res.json();

  const data = json?.data ?? json;

  return {
    msds: Boolean(data?.msds),
    tds: Boolean(data?.tds),
  };
}
