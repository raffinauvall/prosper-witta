"use client";

import { Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-900 pt-10">
      <Navbar />

      {/* Hero */}
      <div className="px-6 py-24 md:px-20">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="uppercase text-xs tracking-widest text-[#CFA54B]">
            Hubungi Kami
          </span>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mt-3 mb-5">
            Contact <span className="text-[#CFA54B]">Us</span>
          </h1>

          <div className="w-16 h-[3px] bg-[#CFA54B] mx-auto mb-6"></div>

          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Kami siap membantu Anda kapan saja. Silakan hubungi kami melalui
            form atau kontak resmi berikut untuk informasi lebih lanjut.
          </p>
        </motion.div>

        {/* Main Layout */}
        <div className="grid md:grid-cols-2 gap-14 max-w-7xl mx-auto">

          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="bg-white rounded-3xl p-10 shadow-md border border-gray-200"
          >
            <h2 className="text-2xl font-semibold mb-8 tracking-tight text-gray-900">
              Informasi Kontak
            </h2>

            <div className="space-y-8">
              {[ 
                { icon: Mail, label: "Email", value: "support@company.com" },
                { icon: Phone, label: "Telepon", value: "+62 812-3456-7890" },
                { icon: MapPin, label: "Alamat Kantor", value: "Jl. Merdeka Raya No. 15, Jakarta" }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-5">
                  <div className="p-4 bg-[#CFA54B]/10 border border-[#CFA54B]/30 rounded-2xl shadow-inner">
                    <item.icon className="w-6 h-6 text-[#CFA54B]" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{item.label}</p>
                    <p className="text-gray-600 mt-1">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Map */}
            <div className="mt-12">
              <iframe
                className="w-full h-64 rounded-2xl shadow-md border border-gray-200"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.764301609701!2d106.8232603!3d-6.165100!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5c5e0485b6b%3A0xf2b8a4f39c5dde3!2sMonas!5e0!3m2!1sen!2sid!4v1702149829382"
                loading="lazy"
              ></iframe>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="bg-white rounded-3xl p-10 shadow-md border border-gray-200"
          >
            <h2 className="text-2xl font-semibold mb-8 tracking-tight text-gray-900">
              Kirim Pesan
            </h2>

            <div className="space-y-6">

              <div>
                <label className="block font-medium mb-2 text-gray-800">Nama</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#CFA54B] outline-none bg-gray-50"
                  placeholder="Nama lengkap Anda"
                />
              </div>

              <div>
                <label className="block font-medium mb-2 text-gray-800">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#CFA54B] outline-none bg-gray-50"
                  placeholder="Alamat email Anda"
                />
              </div>

              <div>
                <label className="block font-medium mb-2 text-gray-800">Pesan</label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#CFA54B] outline-none bg-gray-50"
                  placeholder="Tulis pesan Anda di sini..."
                ></textarea>
              </div>

            </div>

            <button
              type="submit"
              className="mt-8 w-full py-3.5 rounded-xl bg-[#CFA54B] text-white font-semibold text-lg hover:bg-[#b68b3e] transition-all shadow-md"
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
