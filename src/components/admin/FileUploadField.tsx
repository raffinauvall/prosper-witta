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
  hasExisting,
  onChange,
  onRemoveExisting,
  accept = ".pdf",
}: Props) {
  return (
    <div className="w-full space-y-1">
      <p className="text-xs font-medium">{label}</p>

      {/* EXISTING FILE */}
      {hasExisting && !file && (
        <div className="flex items-center justify-between border rounded-lg px-3 py-2 text-xs bg-gray-50">
          <div className="flex items-center gap-2 truncate">
            <FileText className="w-4 h-4 text-[#CFA54B]" />
            <span className="truncate">File uploaded</span>
          </div>

          <button
            onClick={onRemoveExisting}
            className="hover:bg-gray-200 rounded p-1"
            title="Remove file"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* NEW FILE */}
      {file && (
        <div className="flex items-center justify-between border rounded-lg px-3 py-2 text-xs bg-gray-50">
          <span className="truncate">{file.name}</span>

          <button
            onClick={() => onChange(null)}
            className="hover:bg-gray-200 rounded p-1"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* UPLOAD */}
      {!file && !hasExisting && (
        <label className="flex items-center justify-center gap-2 cursor-pointer border border-dashed rounded-lg px-3 py-2 text-gray-500 hover:border-[#CFA54B] hover:text-[#CFA54B] transition text-xs">
          <Upload className="w-4 h-4" />
          <span>Upload PDF</span>

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
