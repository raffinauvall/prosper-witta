"use client";

import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { useLanguage } from "@/src/context/LanguageContext";

export default function ProductCategories() {
  const { t } = useLanguage();

  const categories = [
    {
      slug: "home-care",
      image: "/images/home.jpg",
      title: t("products.categories.home.title"),
      desc: t("products.categories.home.desc"),
    },
    {
      slug: "industrial-cleaner",
      image: "/images/industrial.jpg",
      title: t("products.categories.industrial.title"),
      desc: t("products.categories.industrial.desc"),
    },
    {
      slug: "veterinary",
      image: "/images/veterinary.jpg",
      title: t("products.categories.veterinary.title"),
      desc: t("products.categories.veterinary.desc"),
    },
    {
      slug: "mining",
      image: "/images/mining.jpg",
      title: t("products.categories.mining.title"),
      desc: t("products.categories.mining.desc"),
    },
    {
      slug: "water-treatment",
      image: "/images/water.jpg",
      title: t("products.categories.water.title"),
      desc: t("products.categories.water.desc"),
    },
    {
      slug: "metal-working",
      image: "/images/metal.jpg",
      title: t("products.categories.metal.title"),
      desc: t("products.categories.metal.desc"),
    },
  ];

  return (
    <section className="py-24 px-6 md:px-16 bg-gray-50">
      <div className="max-w-7xl mx-auto">

        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            {t("products.categories.title")}
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto">
            {t("products.categories.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, translateY: 20 }}
              whileInView={{ opacity: 1, translateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
            >
              <ProductCard {...cat} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
