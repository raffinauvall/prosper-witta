"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { sendContact } from "@/lib/api/contact";

export default function ContactForm() {
  const { t } = useLanguage();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await sendContact({ name, email, message });
      setSuccess(t("contact.success") || "Pesan berhasil dikirim");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err: any) {
      setError(err.message || "Gagal mengirim pesan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t("contact.namePlaceholder")}
            required
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#CFA54B] outline-none bg-gray-50 text-sm sm:text-base"
          />
        </div>

        <div>
          <label className="block font-medium mb-2 text-gray-800 text-sm sm:text-base">
            {t("contact.email")}
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("contact.emailPlaceholder")}
            required
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#CFA54B] outline-none bg-gray-50 text-sm sm:text-base"
          />
        </div>

        <div>
          <label className="block font-medium mb-2 text-gray-800 text-sm sm:text-base">
            {t("contact.message")}
          </label>
          <textarea
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t("contact.messagePlaceholder")}
            required
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#CFA54B] outline-none bg-gray-50 text-sm sm:text-base"
          />
        </div>
      </div>

      {/* Feedback */}
      {error && (
        <p className="mt-4 text-sm text-red-600 font-medium">{error}</p>
      )}
      {success && (
        <p className="mt-4 text-sm text-green-600 font-medium">{success}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-7 sm:mt-8 w-full py-3.5 rounded-xl bg-[#CFA54B] text-white font-semibold text-base sm:text-lg hover:bg-[#b68b3e] transition-all shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? t("contact.sending") || "Mengirim..." : t("contact.submit")}
      </button>
    </motion.form>
  );
}
