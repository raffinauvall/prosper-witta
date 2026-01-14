"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function FeatureSection() {
  const { t } = useLanguage();

  return (
    <>
      {/* Fitur */}
      <div className="grid md:grid-cols-2 px-6 gap-10 mt-16">

        {/* VISION */}
        <div className="relative border border-gray-300 rounded-2xl p-8 md:p-10 bg-white shadow-sm hover:shadow-lg transition">

          {/* Accent Line */}
          <div className="absolute top-6 right-6 h-12 w-[2px] bg-[#CFA54B]" />

          <span className="uppercase text-xs tracking-widest text-[#CFA54B]">
            {t("about.feature.vision.badge")}
          </span>

          <h3 className="mt-3 text-2xl font-semibold text-gray-900">
            {t("about.feature.vision.title")}
          </h3>

          <div className="w-12 h-[2px] bg-[#CFA54B] mt-4 mb-6"></div>

          <p className="text-gray-700 leading-relaxed text-base">
            {t("about.feature.vision.desc")}
          </p>
        </div>

        {/* MISSION */}
        <div className="relative border border-gray-300 rounded-2xl p-8 md:p-10 bg-white shadow-sm hover:shadow-lg transition">

          {/* Accent Line */}
          <div className="absolute top-6 right-6 h-12 w-[2px] bg-[#CFA54B]" />

          <span className="uppercase text-xs tracking-widest text-[#CFA54B]">
            {t("about.feature.mission.badge")}
          </span>

          <h3 className="mt-3 text-2xl font-semibold text-gray-900">
            {t("about.feature.mission.title")}
          </h3>

          <div className="w-12 h-[2px] bg-[#CFA54B] mt-4 mb-6"></div>

          <p className="text-gray-700 leading-relaxed text-base">
            {t("about.feature.mission.desc")}
          </p>
        </div>

      </div>
    </>
  );
}
