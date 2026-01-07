"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/src/context/LanguageContext";

export default function ContactForm() {
  const { t } = useLanguage();

  return (
    <motion.form
      initial={{ opacity: 0, x: 35 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.25 }}
      className="bg-white rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 shadow-md border border-gray-200"
    >
      <h2 className="text-xl sm:text-2xl font-semibold mb-6 md:mb-8 tracking-tight text-gray-900">
        {t("contact.formTitle")}
      </h2>

      <div className="space-y-5 sm:space-y-6">
        <div>
          <label className="block font-medium mb-2 text-gray-800 text-sm sm:text-base">
            {t("contact.name")}
          </label>
          <input
            type="text"
            placeholder={t("contact.namePlaceholder")}
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#CFA54B] outline-none bg-gray-50 text-sm sm:text-base"
          />
        </div>

        <div>
          <label className="block font-medium mb-2 text-gray-800 text-sm sm:text-base">
            {t("contact.email")}
          </label>
          <input
            type="email"
            placeholder={t("contact.emailPlaceholder")}
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#CFA54B] outline-none bg-gray-50 text-sm sm:text-base"
          />
        </div>

        <div>
          <label className="block font-medium mb-2 text-gray-800 text-sm sm:text-base">
            {t("contact.message")}
          </label>
          <textarea
            rows={5}
            placeholder={t("contact.messagePlaceholder")}
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#CFA54B] outline-none bg-gray-50 text-sm sm:text-base"
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-7 sm:mt-8 w-full py-3.5 rounded-xl bg-[#CFA54B] text-white font-semibold text-base sm:text-lg hover:bg-[#b68b3e] transition-all shadow-md"
      >
        {t("contact.submit")}
      </button>
    </motion.form>
  );
}
