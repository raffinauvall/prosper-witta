import React from "react";

export interface TextareaProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}

export default function Textarea({
  label,
  value,
  onChange,
  rows = 3,
}: TextareaProps) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded border px-3 py-2"
      />
    </div>
  );
}
