import Footer from "@/components/Footer";
import ProductHero from "@/components/products/ProductHero";
import ProductCategories from "@/components/products/ProductCategories";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore PT Prosper Witta Sejahtera chemical product divisions for home care, industrial cleaner, water treatment, mining, oil & gas, textile, metal working, and veterinary applications.",
  alternates: {
    canonical: "/products",
  },
};

export default function ProductPage() {
  return (
    <main className="bg-white text-[#0A0D12] overflow-hidden">
      <ProductHero />
      <ProductCategories />
      <Footer />
    </main>
  );
}
