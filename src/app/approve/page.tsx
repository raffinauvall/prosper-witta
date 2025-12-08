"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ApprovePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ApproveContent />
    </Suspense>
  );
}

function ApproveContent() {
  const search = useSearchParams();
  const token = search?.get("token");

  const [status, setStatus] = useState("Checking...");

  useEffect(() => {
    if (!token) return;

    const approve = async () => {
      try {
        const res = await fetch(`/api/approve?token=${token}`);
        const data = await res.json().catch(() => ({ error: "Invalid JSON response" }));

        if (res.ok) setStatus("✅ Success! Access Approved.");
        else setStatus("❌ Error: " + (data?.error || "Unknown error"));
      } catch (err) {
        console.error(err);
        setStatus("⚠️ Network/server error");
      }
    };

    approve();
  }, [token]);

  return (
    <div style={{ padding: 40, fontFamily: "sans-serif" }}>
      <h2>{status}</h2>
    </div>
  );
}
