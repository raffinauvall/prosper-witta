"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { sendContact } from "@/lib/api/contact";
import ThankYouModal from "./modals/ThankYouModal";

export default function ContactForm() {
  const { t } = useLanguage();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [subscribe, setSubscribe] = useState(false); // ✅ NEW

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      await sendContact({
        name,
        email,
        message,
        subscribe, 
      });

      setShowModal(true);

      // reset
      setName("");
      setEmail("");
      setMessage("");
      setSubscribe(false);
    } catch (err: any) {
      setError(err.message || "Gagal mengirim pesan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
          {/* NAME */}
          <div>
            <label className="block font-medium mb-2 text-gray-800">
              {t("contact.name")}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("contact.namePlaceholder")}
              required
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#CFA54B] outline-none bg-gray-50"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block font-medium mb-2 text-gray-800">
              {t("contact.email")}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("contact.emailPlaceholder")}
              required
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#CFA54B] outline-none bg-gray-50"
            />
          </div>

          {/* MESSAGE */}
          <div>
            <label className="block font-medium mb-2 text-gray-800">
              {t("contact.message")}
            </label>
            <textarea
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t("contact.messagePlaceholder")}
              required
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#CFA54B] outline-none bg-gray-50"
            />
          </div>

          {/* ✅ SUBSCRIBE */}
          <label className="flex items-center gap-3 cursor-pointer text-sm text-gray-700 select-none">
            <input
              type="checkbox"
              checked={subscribe}
              onChange={(e) => setSubscribe(e.target.checked)}
              className="w-4 h-4 accent-[#CFA54B]"
            />
            <span>
              Berlangganan newsletter & info produk terbaru
            </span>
          </label>
        </div>

        {/* ERROR */}
        {error && (
          <p className="mt-4 text-sm text-red-600 font-medium">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-7 w-full py-3.5 rounded-xl bg-[#CFA54B] text-white font-semibold hover:bg-[#b68b3e] transition disabled:opacity-60"
        >
          {loading ? "Mengirim..." : t("contact.submit")}
        </button>
      </motion.form>

      <ThankYouModal
        open={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}
