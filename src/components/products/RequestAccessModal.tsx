"use client";

import { Dispatch, SetStateAction } from "react";
import { X } from "lucide-react";

export type RequestAccessModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  company: string;
  setCompany: Dispatch<SetStateAction<string>>;
  purpose: string;
  setPurpose: Dispatch<SetStateAction<string>>;
};

export default function RequestAccessModal({
  open,
  onClose,
  onSubmit,
  company,
  setCompany,
  purpose,
  setPurpose,
}: RequestAccessModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Request Access</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        {/* Input: Company */}
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Nama Perusahaan
        </label>
        <input
          type="text"
          className="w-full border border-gray-300 px-3 py-2 mb-4 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Masukkan nama perusahaan"
        />

        {/* Input: Purpose */}
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Keperluan / Alasan
        </label>
        <textarea
          className="w-full border border-gray-300 px-3 py-2 mb-4 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          rows={3}
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
          placeholder="Masukkan alasan permintaan akses"
        />

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-2">
          <button
            className="px-4 py-2 rounded-xl bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition shadow-sm"
            onClick={onSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
