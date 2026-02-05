"use client";

import { Upload, X, FileText } from "lucide-react";

type Props = {
  label: string;
  file: File | null;
  hasExisting?: boolean;
  onChange: (file: File | null) => void;
  onRemoveExisting?: () => void;
  accept?: string;
};

export default function FileUploadField({
  label,
  file,
  hasExisting = false,
  onChange,
  onRemoveExisting,
  accept = ".pdf",
}: Props) {
  return (
    <div className="w-full space-y-1">
      <p className="text-xs font-medium">{label}</p>

      {/* EXISTING FILE */}
      {hasExisting && !file && (
        <div className="flex items-center justify-between border rounded-lg px-3 py-2 text-xs bg-green-50">
          <div className="flex items-center gap-2 truncate text-green-700 font-medium">
            <FileText className="w-4 h-4 text-green-600" />
            <span className="truncate">File uploaded</span>
          </div>

          <button
            type="button"
            onClick={() => onRemoveExisting?.()}
            className="hover:bg-green-100 rounded p-1"
            title="Remove file"
          >
            <X className="w-3 h-3 text-green-700" />
          </button>
        </div>
      )}

      {/* NEW FILE */}
      {file && (
        <div className="flex items-center justify-between border rounded-lg px-3 py-2 text-xs bg-blue-50">
          <span className="truncate text-blue-700 font-medium">
            {file.name}
          </span>

          <button
            type="button"
            onClick={() => onChange(null)}
            className="hover:bg-blue-100 rounded p-1"
            title="Remove selected file"
          >
            <X className="w-3 h-3 text-blue-700" />
          </button>
        </div>
      )}

      {/* UPLOAD / REPLACE */}
      {!file && (
        <label className="flex items-center justify-center gap-2 cursor-pointer border border-dashed rounded-lg px-3 py-2 text-gray-500 hover:border-[#CFA54B] hover:text-[#CFA54B] transition text-xs">
          <Upload className="w-4 h-4" />
          <span>{hasExisting ? "Replace PDF" : "Upload PDF"}</span>

          <input
            type="file"
            hidden
            accept={accept}
            onChange={(e) => onChange(e.target.files?.[0] || null)}
          />
        </label>
      )}
    </div>
  );
}
