"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface ThankYouModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ThankYouModal({
  open,
  onClose,
}: ThankYouModalProps) {
  const { t } = useLanguage();

  if (!open) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={onClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full text-center shadow-xl"
      >
        <h3 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-900">
          🎉 {t("contact.thankYouTitle") || "Terima kasih!"}
        </h3>

        <p className="text-gray-600 text-sm sm:text-base mb-6">
          {t("contact.thankYouMessage") ||
            "Pesan Anda sudah kami terima. Tim kami akan segera menghubungi Anda."}
        </p>

        <button
          onClick={onClose}
          className="px-6 py-3 rounded-xl bg-[#CFA54B] text-white font-semibold hover:bg-[#b68b3e] transition"
        >
          OK
        </button>
      </motion.div>
    </motion.div>
  );
}
