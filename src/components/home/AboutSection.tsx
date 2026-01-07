"use client";

import { useLanguage } from "@/src/context/LanguageContext";

export default function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="about" className="bg-white py-24 px-6 md:px-16 text-white">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="grid md:grid-cols-2 gap-16 items-start mb-4">
          <h2 className="text-3xl md:text-5xl font-bold leading-tight text-black">
            {t("home.about.title1")}
            <span className="block text-[#F5B400]">
              {t("home.about.title2")}
            </span>
          </h2>

          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            {t("home.about.description")}
          </p>
        </div>
      </div>
    </section>
  );
}
