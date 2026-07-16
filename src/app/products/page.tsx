import Footer from "@/components/Footer";
import ProductHero from "@/components/products/ProductHero";
import ProductCategories from "@/components/products/ProductCategories";
import { Metadata } from "next";
import { defaultOpenGraphImages } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Products — Specialty Chemical Divisions",
  description:
    "Explore PT Prosper Witta Sejahtera specialty chemical product divisions: home care, industrial cleaner, water treatment, mining, oil & gas, textile, metal working, and veterinary chemicals.",
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    title: "Chemical Products — PT Prosper Witta Sejahtera",
    description:
      "Browse our complete range of specialty chemical products across 8 industry divisions.",
    url: "/products",
    images: defaultOpenGraphImages,
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
