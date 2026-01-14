"use client";

import { useEffect, useRef, useState, use } from "react";
import { useSearchParams } from "next/navigation";
import { getDeviceToken } from "@/lib/deviceToken";

export default function DocumentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const searchParams = useSearchParams();
  const type = searchParams.get("type") as "msds" | "tds";

  if (!type || (type !== "msds" && type !== "tds")) {
    throw new Error("Invalid document type");
  }

  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isRendering, setIsRendering] = useState(true);

  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 768;
  const SCALE = isMobile ? 0.7 : 1.35;

  /* ================= LOAD PDF ================= */
  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const deviceToken = getDeviceToken();
        if (!deviceToken) return;

        const pdfjs = await import("pdfjs-dist/build/pdf.mjs");
        pdfjs.GlobalWorkerOptions.workerSrc = new URL(
          "pdfjs-dist/build/pdf.worker.mjs",
          import.meta.url
        ).toString();

        const res = await fetch(
          `/api/documents/stream?productId=${id}&type=${type}`,
          {
            headers: { "x-device-token": deviceToken },
            cache: "no-store",
          }
        );
        if (!res.ok || cancelled) return;

        const buffer = await res.arrayBuffer();
        if (cancelled) return;

        const pdf = await pdfjs.getDocument({ data: buffer }).promise;
        if (cancelled) return;

        setTotalPages(pdf.numPages);

        const container = containerRef.current;
        if (!container) return;

        container.innerHTML = "";

        const wrapper = document.createElement("div");
        wrapper.style.display = "flex";
        wrapper.style.flexDirection = "column";
        wrapper.style.gap = "28px";

        container.appendChild(wrapper);
        wrapperRef.current = wrapper;

        for (let i = 1; i <= pdf.numPages; i++) {
          if (cancelled) return;

          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: SCALE });

          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          if (!ctx) return;

          canvas.width = viewport.width;
          canvas.height = viewport.height;
          canvas.style.background = "#fff";
          canvas.style.borderRadius = "10px";

          wrapper.appendChild(canvas);
          await page.render({ canvasContext: ctx, viewport }).promise;
        }

        if (!cancelled) setIsRendering(false);
      } catch (err) {
        console.error("PDF error:", err);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [id, type]);

  /* ================= PAGE TRACKER ================= */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onScroll = () => {
      const mid = el.scrollTop + el.clientHeight / 2;
      const pages = Array.from(
        el.querySelectorAll("canvas")
      ) as HTMLCanvasElement[];

      for (let i = pages.length - 1; i >= 0; i--) {
        if (mid >= pages[i].offsetTop) {
          setCurrentPage(i + 1);
          break;
        }
      }
    };

    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  /* ================= UI ================= */
  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #1b1b1b 0%, #0b0b0b 60%)",
        color: "#fff",
      }}
    >
      {/* TOP BAR */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          backdropFilter: "blur(10px)",
          background: "rgba(15,15,15,.85)",
          borderBottom: "1px solid rgba(255,255,255,.08)",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "14px 16px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <button
            onClick={() => history.back()}
            style={{
              padding: "8px 14px",
              borderRadius: 10,
              background: "rgba(255,255,255,.12)",
              border: "1px solid rgba(255,255,255,.15)",
              color: "#fff",
            }}
          >
            ← Back
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {isRendering && (
              <span
                style={{
                  display: "inline-block",
                  width: 14,
                  height: 14,
                  border: "2px solid rgba(255,255,255,.25)",
                  borderTopColor: "#fff",
                  borderRadius: "50%",
                  animation: "spin .8s linear infinite",
                }}
              />
            )}
            <span style={{ fontSize: 13, opacity: 0.7 }}>
              Secure PDF Viewer
            </span>
          </div>
        </div>
      </div>

      {/* VIEWER */}
      <div style={{ display: "flex", justifyContent: "center", padding: 32 }}>
        <div
          ref={containerRef}
          style={{
            width: "100%",
            maxWidth: 920,
            height: "calc(100vh - 160px)",
            overflowY: "auto",
            background: "#0f0f0f",
            padding: 28,
            borderRadius: 14,
            boxShadow: "0 25px 70px rgba(0,0,0,.65)",
          }}
        />
      </div>

      {!isRendering && (
        <div
          style={{
            position: "fixed",
            bottom: 24,
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(0,0,0,.75)",
            padding: "10px 18px",
            borderRadius: 999,
            fontSize: 13,
            border: "1px solid rgba(255,255,255,.15)",
          }}
        >
          {currentPage} / {totalPages}
        </div>
      )}

      <style jsx global>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
