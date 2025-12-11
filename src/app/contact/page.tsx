"use client";

import { Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-900 pt-6 md:pt-10">
      <Navbar />

      {/* Hero */}
      <div className="px-4 sm:px-6 py-16 md:px-20 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="uppercase text-xs tracking-widest text-[#CFA54B]">
            Hubungi Kami
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mt-3 mb-5">
            Contact <span className="text-[#CFA54B]">Us</span>
          </h1>

          <div className="w-16 h-[3px] bg-[#CFA54B] mx-auto mb-6"></div>

          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-2">
            Kami siap membantu Anda kapan saja. Silakan hubungi kami melalui
            form atau kontak resmi berikut untuk informasi lebih lanjut.
          </p>
        </motion.div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 max-w-7xl mx-auto">

          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="bg-white rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 shadow-md border border-gray-200"
          >
            <h2 className="text-xl sm:text-2xl font-semibold mb-6 md:mb-8 tracking-tight text-gray-900">
              Informasi Kontak
            </h2>

            <div className="space-y-6 sm:space-y-8">
              {[
                { icon: Mail, label: "Email", value: "admin@prosperwittasejahtera.com" },
                { icon: Phone, label: "Telepon", value: "(021) 2188 5249" },
                { icon: MapPin, label: "Alamat Kantor", value: "Scientia Business Park Tower 2, Lantai 2 Jl. Boulevard Gading Serpong Blok O/2 Tangerang 15810" }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 sm:gap-5">
                  <div className="p-3 sm:p-4 bg-[#CFA54B]/10 border border-[#CFA54B]/30 rounded-xl sm:rounded-2xl shadow-inner">
                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#CFA54B]" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm sm:text-base">{item.label}</p>
                    <p className="text-gray-600 mt-1 text-sm sm:text-base leading-relaxed">{item.value}</p>
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
              ></iframe>
            </div>

          </motion.div>

          {/* Right: Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="bg-white rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 shadow-md border border-gray-200"
          >
            <h2 className="text-xl sm:text-2xl font-semibold mb-6 md:mb-8 tracking-tight text-gray-900">
              Kirim Pesan
            </h2>

            <div className="space-y-5 sm:space-y-6">
              
              <div>
                <label className="block font-medium mb-2 text-gray-800 text-sm sm:text-base">
                  Nama
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#CFA54B] outline-none bg-gray-50 text-sm sm:text-base"
                  placeholder="Nama lengkap Anda"
                />
              </div>

              <div>
                <label className="block font-medium mb-2 text-gray-800 text-sm sm:text-base">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#CFA54B] outline-none bg-gray-50 text-sm sm:text-base"
                  placeholder="Alamat email Anda"
                />
              </div>

              <div>
                <label className="block font-medium mb-2 text-gray-800 text-sm sm:text-base">
                  Pesan
                </label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#CFA54B] outline-none bg-gray-50 text-sm sm:text-base"
                  placeholder="Tulis pesan Anda di sini..."
                ></textarea>
              </div>

            </div>

            <button
              type="submit"
              className="mt-7 sm:mt-8 w-full py-3.5 rounded-xl bg-[#CFA54B] text-white font-semibold text-base sm:text-lg hover:bg-[#b68b3e] transition-all shadow-md"
            >
              Kirim Pesan
            </button>
          </motion.form>

        </div>
      </div>

      <Footer />
    </div>
  );
}
