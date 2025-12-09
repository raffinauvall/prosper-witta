"use client"

import React from "react";
import Footer from "@/src/components/Footer";
import Navbar from "@/src/components/Navbar";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const categories = [
  {
    title: "Home & Personal Care",
    desc: "High-quality chemicals for daily hygiene, formulation, and personal care products.",
    slug: "home-care",
    image: "/images/home.jpg"
  },
  {
    title: "Institutional & Industrial Cleaner",
    desc: "Industrial-grade cleaning chemicals for plants, facilities, and heavy equipment.",
    slug: "industrial-cleaner",
    image: "/images/industrial.jpg"
  },
  {
    title: "Veterinary",
    desc: "Chemical solutions supporting animal health and biosecurity systems.",
    slug: "veterinary",
    image: "/images/veterinary.jpg"
  },
  {
    title: "Mining",
    desc: "Specialized chemicals for mineral processing, flotation, and mining performance.",
    slug: "mining",
    image: "/images/mining.jpg"
  },
  {
    title: "Water Treatment",
    desc: "Water purification & treatment solutions for industrial and commercial sectors.",
    slug: "water-treatment",
    image: "/images/water.jpg"
  },
  {
    title: "Metal Working",
    desc: "Chemicals for metal processing, machining fluids, and surface treatments.",
    slug: "metal-working",
    image: "/images/metal.jpg"
  }
];

export default function ProductPage() {
  return (
    <main className="bg-white text-[#0A0D12] overflow-hidden">

      {/* HERO SECTION */}
      <section className="relative flex flex-col">
        <div className="absolute inset-0">
          <img
            src="/productsec.jpg"
            alt="Chemical Industry"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <Navbar />

        <div className="relative z-10 flex-1 flex items-center justify-center px-6 pt-36 pb-24">
          <div className="max-w-4xl text-center">
            <h1 className="text-[40px] text-white md:text-[64px] xl:text-[72px] font-bold leading-tight">
              Built on Quality
              <span className="block">Driven by Industrial Needs</span>
            </h1>

            <p className="mt-6 text-white text-base md:text-lg">
              From industrial cleaning to mining, veterinary, and water treatment,
              we provide chemical solutions tailored for performance, safety, and growth.
            </p>
          </div>
        </div>
      </section>

      {/* CATEGORY SECTION */}
      <section className="py-24 px-6 md:px-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">

          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Our Product Categories
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Specialized chemical solutions built to support different
              industrial sectors with consistent quality and reliability.
            </p>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, translateY: 20 }}
                whileInView={{ opacity: 1, translateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition transform hover:-translate-y-1"
              >
                <Link href={`/products/${cat.slug}`} className="block relative w-full h-56">
                  <div className="relative w-full h-full group">
                    <Image
                      src={cat.image}
                      alt={cat.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>
                </Link>

                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{cat.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{cat.desc}</p>

                  <div className="flex items-center justify-between">
                    <Link href={`/products/${cat.slug}`} className="text-[#CFA54B] font-medium hover:underline">
                      View Category →
                    </Link>
                    <Link href={`/products/${cat.slug}`} className="text-xs py-1 px-3 border border-gray-200 rounded-full hover:bg-gray-100">
                      Explore
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
