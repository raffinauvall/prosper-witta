"use client";

import { motion } from "framer-motion";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import { FlaskRound, Award, Target, Users, Leaf } from "lucide-react";
import FeatureSection from "@/src/components/about/FeatureSection";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />

      {/* Hero Section */}
<section
  className="relative px-6 md:px-20 py-32 bg-cover bg-center bg-no-repeat mb-20"
  style={{ backgroundImage: "url('/about.jpg')" }}
>
  {/* Overlay biar teks tetap kebaca */}
  <div className="absolute inset-0 bg-black/50"></div>

  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="relative max-w-4xl mx-auto text-center text-white"
  >
    <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
      Driving Industrial Progress Through - <span className="text-[#F5B400]">Reliable Chemical Solutions.</span>
    </h1>

    <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
      PT Prosper Witta Sejahtera adalah perusahaan perdagangan bahan kimia yang
      berkomitmen menghadirkan solusi inovatif untuk berbagai kebutuhan industri.
    </p>
  </motion.div>
</section>


      {/* Company Profile */}
      <section className="px-6 md:px-20 max-w-7xl mx-auto mb-30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <img
            src="productsec.jpg"
            className="rounded-2xl shadow-lg object-cover w-full h-80"
            alt="factory"
          />

          <div>
            <h2 className="text-3xl font-bold mb-4 text-[#CFA54B]">Company Overview</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              PT Prosper Witta Sejahtera didirikan pada tahun 2024 sebagai perusahaan
              perdagangan bahan kimia yang fokus menyediakan produk dan solusi untuk berbagai
              sektor industri.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Kami melayani aplikasi industri seperti: Home & Personal Care, Institutional &
              Industrial Cleaner, Veterinary, Mining, Water Treatment, Metal Working Kami hadir dengan standar kualitas tinggi untuk mendukung kebutuhan
              produksi maupun operasional klien kami.
            </p>
          </div>
        </motion.div>
      </section>
    <div className="md:px-20 px-6 max-w-7xl mx-auto">
      <FeatureSection />
</div>
     {/* Core Values */}
<section className="px-6 md:px-20 py-20 max-w-8xl mx-auto">
  <div className="text-center mb-14">
    <span className="uppercase text-xs tracking-widest text-[#CFA54B]">
      Our Principles
    </span>
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
      Company Value
    </h2>

    <div className="w-16 h-[3px] bg-[#CFA54B] mx-auto mt-4"></div>
  </div>

  <div className="grid md:grid-cols-3 gap-10">
    {[{
      icon: Users,
      title: "Kolaborasi",
      desc: "Bekerja bersama pelanggan dan partner untuk mencapai tujuan bersama.",
    },
    {
      icon: FlaskRound,
      title: "Inovasi",
      desc: "Selalu mencari solusi baru yang lebih efektif dan efisien.",
    },
    {
      icon: Leaf,
      title: "Keberlanjutan",
      desc: "Mendukung praktik industri yang aman dan ramah lingkungan.",
    }].map((item, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: i * 0.1 }}
        className="relative p-8 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition cursor-default"
      >
        {/* Accent Line */}
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


      <Footer />
    </div>
  );
}
