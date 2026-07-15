"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";

export default function CompanyProfile() {
  const { t } = useLanguage();

  return (
    <section className="px-6 md:px-20 max-w-7xl mx-auto mb-30">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid md:grid-cols-2 gap-12 items-center"
      >
        <div className="relative h-80 w-full">
          <Image
            src="/productsec.png"
            className="rounded-2xl shadow-lg object-cover"
            alt="factory"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-4 text-[#CFA54B]">
            {t("about.company.title")}
          </h2>

          <p className="text-gray-700 leading-relaxed mb-4">
            {t("about.company.desc1")}
          </p>

          <p className="text-gray-700 leading-relaxed">
            {t("about.company.desc2")}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
