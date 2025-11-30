"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ApprovePageClient() {
  const search = useSearchParams();
  const token = search.get("token");

  const [status, setStatus] = useState("Checking approval...");
  const [showNotif, setShowNotif] = useState(false);

  useEffect(() => {
    if (!token) return;

    async function approve() {
      try {
        const res = await fetch(`/api/approve?token=${token}`);
        let data = null;

        try {
          data = await res.json();
        } catch {
          data = { error: "Invalid JSON response" };
        }

        if (res.ok) {
          setStatus("✅ Success! Access Approved.");
          setShowNotif(true);

          // auto-hide notif 2 detik
          setTimeout(() => setShowNotif(false), 2000);
        } else {
          setStatus("❌ Error: " + (data?.error || "Unknown error"));
        }
      } catch (err) {
        setStatus("⚠️ Network or server error");
        console.error(err);
      }
    }

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
