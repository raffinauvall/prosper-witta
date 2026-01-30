"use client";

import { requestAccess } from "@/lib/api/documents/request-access";
import { getDeviceToken } from "@/lib/deviceToken";
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
    purpose: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!open) return null;

  const label = type.toUpperCase();

  const update = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const resetForm = () => {
    setForm({
      name: "",
      company: "",
      email: "",
      purpose: "",
    });
    setError(null);
    setSuccess(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email) {
      setError("Name and email are required.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const deviceToken = getDeviceToken(); // 🔥 PENTING
      if (!deviceToken) {
        setError("Device token not available. Please refresh the page.");
        setLoading(false);
        return;
      }

      await requestAccess({
        productId,
        type,
        deviceToken, // 🔥 FIX DI SINI
        name: form.name,
        email: form.email,
        company: form.company || undefined,
        purpose: form.purpose || undefined,
      });

      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError("Failed to submit request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-2xl p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        {!success ? (
          <>
            <h2 className="text-xl font-semibold mb-1">
              Request {label} Document
            </h2>

            <p className="text-sm text-gray-500 mb-6">
              This document is restricted. Please provide your details to request
              access.
            </p>

            {error && (
              <p className="mb-4 text-sm text-red-600">{error}</p>
            )}

            <div className="space-y-3">
              <input
                placeholder="Full Name *"
                className="w-full rounded-xl border px-4 py-3 text-sm"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
              />

             <div className="space-y-1">
 

  <div className="relative">
    <input
      type="email"
      placeholder="name@company.com"
      className="w-full rounded-xl border px-4 py-3 text-sm"
      value={form.email}
      onChange={(e) => update("email", e.target.value)}
    />

    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-gray-400">
      approval notification via email
    </span>
  </div>
</div>


            </div>

            <div className="mt-5 border-t pt-4 space-y-3">
              <input
                placeholder="Company (optional)"
                className="w-full rounded-xl border px-4 py-3 text-sm"
                value={form.company}
                onChange={(e) => update("company", e.target.value)}
              />

              <textarea
                placeholder="Purpose (optional)"
                rows={3}
                className="w-full rounded-xl border px-4 py-3 text-sm resize-none"
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
              onClick={handleClose}
              className="mt-3 w-full text-sm text-gray-400"
            >
              Cancel
            </button>
          </>
        ) : (
          <div className="text-center py-10">
            <h3 className="text-lg font-semibold text-green-600 mb-2">
              Request Submitted
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Your request has been sent successfully.
            </p>
            <button
              onClick={handleClose}
              className="w-full bg-blue-900 text-white py-3 rounded-xl"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
