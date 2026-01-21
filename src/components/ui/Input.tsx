import React from "react";

export interface InputProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: React.HTMLInputTypeAttribute;
}

export default function Input({
  label,
  value,
  onChange,
  type = "text",
}: InputProps) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded border px-3 py-2"
      />
    </div>
  );
}
