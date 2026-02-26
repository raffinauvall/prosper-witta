"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function AboutSection() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={ref}
      className="bg-white py-24 px-6 md:px-16"
    >
      <div className="max-w-6xl mx-auto">

        <div className="grid md:grid-cols-2 gap-16 items-start mb-4">

          {/* Title Animation */}
          <motion.h2
            initial={{ x: -100, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl md:text-5xl font-bold leading-tight text-black"
          >
            {t("home.about.title1")}
            <span className="block text-[#F5B400]">
              {t("home.about.title2")}
            </span>
          </motion.h2>

          {/* Description Animation */}
          <motion.p
            initial={{ x: 100, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-gray-700 text-base md:text-lg leading-relaxed"
          >
            {t("home.about.description")}
          </motion.p>

        </div>

      </div>
    </section>
  );
}
