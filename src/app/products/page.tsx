"use client";

import Footer from "@/src/components/Footer";
import ProductHero from "@/src/components/products/ProductHero";
import ProductCategories from "@/src/components/products/ProductCategories";

export default function ProductPage() {
  return (
    <main className="bg-white text-[#0A0D12] overflow-hidden">
      <ProductHero />
      <ProductCategories />
      <Footer />
    </main>
  );
}
