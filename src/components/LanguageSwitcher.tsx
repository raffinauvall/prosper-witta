"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center gap-3 text-sm font-semibold">
      <LangButton
        active={lang === "id"}
        onClick={() => setLang("id")}
      >
        ID
      </LangButton>

      <span className="opacity-40">|</span>

      <LangButton
        active={lang === "en"}
        onClick={() => setLang("en")}
      >
        EN
      </LangButton>
    </div>
  );
}

function LangButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`transition hover:opacity-80 ${
        active ? "underline underline-offset-4" : "opacity-60"
      }`}
    >
      {children}
    </button>
  );
}
