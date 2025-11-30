"use client";

import { Dispatch, SetStateAction } from "react";

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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Request Access</h2>

        <label className="block mb-2 text-sm font-medium">Nama Perusahaan</label>
        <input
          type="text"
          className="w-full border px-3 py-2 mb-4 rounded"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <label className="block mb-2 text-sm font-medium">Keperluan / Alasan</label>
        <textarea
          className="w-full border px-3 py-2 mb-4 rounded"
          rows={3}
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            onClick={onSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
