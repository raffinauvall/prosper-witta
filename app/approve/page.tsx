"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ApprovePage() {
  const search = useSearchParams();
  const token = search.get("token");

  const [status, setStatus] = useState("Checking approval...");
  const [showNotif, setShowNotif] = useState(false);

  useEffect(() => {
    if (!token) {
      setStatus("Error: Missing token");
      return;
    }

    async function approve() {
      try {
        const res = await fetch(`/api/approve?token=${token}`);
        let data;

        try {
          data = await res.json();
        } catch {
          data = { error: "Invalid JSON response" };
        }

        if (res.ok) {
          setStatus("Success! Access Approved.");
          setShowNotif(true);

          // auto-hide notif 2 detik
          setTimeout(() => setShowNotif(false), 2000);
        } else {
          setStatus("Error: " + (data?.error || "Unknown error"));
        }
      } catch (err) {
        setStatus("Network or server error");
        console.error(err);
      }
    }

    approve();
  }, [token]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial, sans-serif",
        padding: 20,
        backgroundColor: "#f4f4f7",
      }}
    >
      <h2 style={{ marginBottom: 20 }}>{status}</h2>

      {showNotif && (
        <div
          style={{
            backgroundColor: "#4caf50",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: 6,
            fontWeight: "bold",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            transition: "opacity 0.3s",
          }}
        >
          Access approved!
        </div>
      )}
    </div>
  );
}
