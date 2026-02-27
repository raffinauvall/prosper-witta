import Navbar from "@/components/Navbar";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection"
import PrincipleCarousel from "../components/home/PrincipleCarousel";
import ProductSection from "@/components/home/ProductSection"
import Footer from "@/components/Footer"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PT Prosper Witta Sejahtera - Chemical Trading Company",
  description:
    "PT Prosper Witta Sejahtera is a chemical trading company established in 2024 serving industrial applications such as Home & Personal Care and Institutional sectors.",
};

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <PrincipleCarousel />
      <ProductSection />
      <Footer />
    </>
  );
}
