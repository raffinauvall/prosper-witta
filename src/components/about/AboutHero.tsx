"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutHero() {
  const { t } = useLanguage();

  return (
    <section
      className="relative px-6 md:px-20 py-32 bg-cover bg-center bg-no-repeat mb-20"
      style={{ backgroundImage: "url('/about.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/50" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative max-w-4xl mx-auto text-center text-white"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
          {t("about.hero.title")}{" "}
          <span className="text-[#F5B400]">
            {t("about.hero.highlight")}
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
          {t("about.hero.subtitle")}
        </p>
      </motion.div>
    </section>
  );
}
