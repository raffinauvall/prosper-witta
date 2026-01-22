import Footer from "@/components/Footer";
import ProductHero from "@/components/products/ProductHero";
import ProductCategories from "@/components/products/ProductCategories";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product | PT Prosper Witta Sejahtera",
  description: "Home Page",
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
