"use client";

import { Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function ContactInfo() {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, x: -35 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.15 }}
      className="bg-white rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 shadow-md border border-gray-200"
    >
      <h2 className="text-xl sm:text-2xl font-semibold mb-6 md:mb-8 tracking-tight text-gray-900">
        {t("contact.contactInfo")}
      </h2>

      <div className="space-y-6 sm:space-y-8">
        {[
          {
            icon: Mail,
            label: t("contact.email"),
            value: "admin@prosperwittasejahtera.com",
          },
          {
            icon: Phone,
            label: t("contact.phone"),
            value: "(021) 2188 5249",
          },
          {
            icon: MapPin,
            label: t("contact.address"),
            value:
              "Scientia Business Park Tower 2, Lantai 2 Jl. Boulevard Gading Serpong Blok O/2 Tangerang 15810",
          },
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-4 sm:gap-5">
            <div className="p-3 sm:p-4 bg-[#CFA54B]/10 border border-[#CFA54B]/30 rounded-xl sm:rounded-2xl shadow-inner">
              <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#CFA54B]" />
            </div>

            <div>
              <p className="font-semibold text-gray-900 text-sm sm:text-base">
                {item.label}
              </p>
              <p className="text-gray-600 mt-1 text-sm sm:text-base leading-relaxed">
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Map */}
      <div className="mt-10 md:mt-12">
        <iframe
          className="w-full h-52 sm:h-60 md:h-64 rounded-xl sm:rounded-2xl shadow-md border border-gray-200"
          src="https://maps.google.com/maps?q=PT+Prosper+Witta+Sejahtera&t=&z=13&ie=UTF8&iwloc=&output=embed"
          loading="lazy"
        />
      </div>
    </motion.div>
  );
}
