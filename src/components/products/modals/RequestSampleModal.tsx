"use client";

import { X } from "lucide-react";

interface Props {
  open: boolean;
  productId: number;
  onClose: () => void;
}

export default function RequestSampleModal({ open, onClose, productId}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-lg">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <h2 className="mb-2 text-lg font-semibold text-gray-900">
          Request Product Sample
        </h2>


        <form className="space-y-4">
          <Input label="Full Name" placeholder="Your full name" />
          <Input label="Company Name" placeholder="Your company name" />
          <Input label="Email" type="email" placeholder="company@email.com" />
          <Input label="Phone Number" placeholder="+62 xxx xxxx xxxx" />

          <Textarea
            label="Shipping Address"
            placeholder="Complete shipping address"
          />

          <Textarea
            label="Intended Application (Optional)"
            placeholder="e.g. formulation testing, cleaning process"
          />

          

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}

/* ========== Small Components ========== */

function Input({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div>
      <label className="mb-1 block text-sm text-gray-600">{label}</label>
      <input
        {...props}
        className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

function Textarea({
  label,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  return (
    <div>
      <label className="mb-1 block text-sm text-gray-600">{label}</label>
      <textarea
        {...props}
        rows={3}
        className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
