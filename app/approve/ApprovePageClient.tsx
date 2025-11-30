// app/approve/ApprovePageClient.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ApprovePageClient() {
  const search = useSearchParams();
  const token = search.get("token");

  const [status, setStatus] = useState("Checking approval...");

  useEffect(() => {
    if (!token) return;

    async function approve() {
      try {
        const res = await fetch(`/api/approve?token=${token}`);
        const data = await res.json();

        if (res.ok) setStatus("Success! Access Approved.");
        else setStatus("Error: " + (data?.error || "Unknown error"));
      } catch (err) {
        setStatus("Network or server error");
        console.error(err);
      }
    }

    approve();
  }, [token]);

  return (
    <div style={{ padding: 40, fontFamily: "sans-serif" }}>
      <h2>{status}</h2>
    </div>
  );
}
