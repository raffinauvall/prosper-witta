import { RequestSampleResponse } from "@/lib/types";

export async function getRequestSample(page = 1, limit = 10) {
  const res = await fetch(
    `/api/admin/request-sample?page=${page}&limit=${limit}`,
    {
      credentials: "include", 
    }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to fetch request sample");
  }

  return res.json();
}

