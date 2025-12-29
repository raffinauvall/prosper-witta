"use client";

import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  productId: number;
  type: "msds" | "tds";
};

export default function RequestAccessModal({
  open,
  onClose,
  productId,
  type,
}: Props) {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    address: "",
    purpose: "",
  });

  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const label = type.toUpperCase();

  const update = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async () => {
    if (!form.name || !form.email) return;

    setLoading(true);

    await fetch("/api/request-access", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId,
        type,
        ...form,
      }),
    });

    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
  <div className="bg-white rounded-2xl p-6 w-full max-w-md">
    <h2 className="text-xl font-semibold mb-1">
      Request {label} Document
    </h2>

    <p className="text-sm text-gray-500 mb-6">
      This document is restricted. Please provide your details to request access.
    </p>

    {/* REQUIRED */}
    <div className="space-y-3">
      <input
        placeholder="Full Name *"
        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-600 outline-none"
        value={form.name}
        onChange={(e) => update("name", e.target.value)}
      />

      <input
        placeholder="Work Email *"
        className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-600 outline-none"
        value={form.email}
        onChange={(e) => update("email", e.target.value)}
      />
    </div>

    {/* OPTIONAL */}
    <div className="mt-5 border-t pt-4 space-y-3">
      <input
        placeholder="Company (optional)"
        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm"
        value={form.company}
        onChange={(e) => update("company", e.target.value)}
      />

      <textarea
        placeholder="Purpose of request (optional)"
        rows={3}
        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm resize-none"
        value={form.purpose}
        onChange={(e) => update("purpose", e.target.value)}
      />
    </div>

    <button
      onClick={handleSubmit}
      disabled={loading}
      className="mt-6 w-full bg-blue-900 text-white py-3 rounded-xl font-medium disabled:opacity-50"
    >
      {loading ? "Submitting..." : `Request ${label}`}
    </button>

    <button
      onClick={onClose}
      className="mt-3 w-full text-sm text-gray-400 hover:text-gray-600"
    >
      Cancel
    </button>
  </div>
</div>

  );
}
