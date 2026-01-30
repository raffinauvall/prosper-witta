"use client";

import { useEffect } from "react";
import { Check } from "lucide-react";

export default function RequestApprovedPage() {
  // optional: auto close / redirect
  useEffect(() => {
    const timer = setTimeout(() => {
      window.close(); // works kalau dibuka dari email
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-slate-100">
      <div className="bg-white rounded-2xl shadow-xl px-10 py-12 text-center max-w-md w-full animate-fade-in">
        
        {/* Animated Check */}
        <div className="mx-auto mb-6 flex items-center justify-center w-20 h-20 rounded-full bg-emerald-100 animate-scale-in">
          <Check
            size={40}
            strokeWidth={3}
            className="text-emerald-600 animate-draw"
          />
        </div>

        <h1 className="text-2xl font-semibold text-slate-800 mb-2">
          Request Approved
        </h1>

        <p className="text-slate-600">
          Permintaan akses berhasil disetujui.
        </p>

        <p className="text-sm text-slate-400 mt-3">
          Anda dapat menutup halaman ini.
        </p>
      </div>
    </main>
  );
}
