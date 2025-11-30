"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ApprovePageClient() {
  const search = useSearchParams();
  const token = search?.get("token");

  const [status, setStatus] = useState("Checking...");
  const [showNotif, setShowNotif] = useState(false);

  useEffect(() => {
    if (!token) return;

    const approve = async () => {
      try {
        const res = await fetch(`/api/approve?token=${token}`);
        const data = await res.json().catch(() => ({ error: "Invalid JSON" }));

        if (res.ok) {
          setStatus("✅ Access Approved!");
          setShowNotif(true);
          setTimeout(() => setShowNotif(false), 2000);
        } else {
          setStatus("❌ Error: " + (data?.error || "Unknown error"));
        }
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
      {showNotif && (
        <div
          style={{
            marginTop: 20,
            padding: 10,
            backgroundColor: "#4ade80",
            color: "#000",
            borderRadius: 8,
            maxWidth: 300,
          }}
        >
          Access approved!
        </div>
      )}
    </div>
  );
}
