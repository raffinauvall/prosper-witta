"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactHeader() {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="text-center mb-16 md:mb-20"
    >
      <span className="uppercase text-xs tracking-widest text-[#CFA54B]">
        {t("contact.badge")}
      </span>

      <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mt-3 mb-5">
        {t("contact.title")}{" "}
        <span className="text-[#CFA54B]">
          {t("contact.highlight")}
        </span>
      </h1>

      <div className="w-16 h-[3px] bg-[#CFA54B] mx-auto mb-6"></div>

      <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-2">
        {t("contact.subtitle")}
      </p>
    </motion.div>
  );
}
