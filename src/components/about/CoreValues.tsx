"use client";

import { motion } from "framer-motion";
import { Users, FlaskRound, Leaf } from "lucide-react";
import { useLanguage } from "@/src/context/LanguageContext";

export default function CoreValues() {
  const { t } = useLanguage();

  const values = [
    {
      icon: Users,
      title: t("about.values.collaboration.title"),
      desc: t("about.values.collaboration.desc"),
    },
    {
      icon: FlaskRound,
      title: t("about.values.innovation.title"),
      desc: t("about.values.innovation.desc"),
    },
    {
      icon: Leaf,
      title: t("about.values.sustainability.title"),
      desc: t("about.values.sustainability.desc"),
    },
  ];

  return (
    <section className="px-6 md:px-20 py-20 max-w-8xl mx-auto">
      <div className="text-center mb-14">
        <span className="uppercase text-xs tracking-widest text-[#CFA54B]">
          {t("about.values.badge")}
        </span>

        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
          {t("about.values.title")}
        </h2>

        <div className="w-16 h-[3px] bg-[#CFA54B] mx-auto mt-4" />
      </div>

      <div className="grid md:grid-cols-3 gap-10">
        {values.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative p-8 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition"
          >
            <div className="absolute top-6 right-6 h-10 w-[2px] bg-[#CFA54B]" />

            <item.icon className="w-12 h-12 text-[#CFA54B] mb-5" />

            <h4 className="text-xl font-semibold mb-3 text-gray-900">
              {item.title}
            </h4>

            <p className="text-gray-600 leading-relaxed text-base">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
