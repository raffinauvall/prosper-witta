"use client";

import { useState } from "react";
import { useLanguage } from "@/src/context/LanguageContext";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1 rounded-md border border-current text-sm font-semibold hover:opacity-80 transition"
      >
        {lang.toUpperCase()}
        <span className="text-xs">▼</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-24 overflow-hidden rounded-md bg-white text-black shadow-lg">
          <button
            onClick={() => {
              setLang("id");
              setOpen(false);
            }}
            className="w-full px-3 py-2 text-left hover:bg-gray-100"
          >
            ID
          </button>

          <button
            onClick={() => {
              setLang("en");
              setOpen(false);
            }}
            className="w-full px-3 py-2 text-left hover:bg-gray-100"
          >
            EN
          </button>
        </div>
      )}
    </div>
  );
}
