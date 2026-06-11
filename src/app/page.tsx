import Navbar from "@/components/Navbar";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection"
import PrincipleCarousel from "../components/home/PrincipleCarousel";
import ProductSection from "@/components/home/ProductSection"
import Footer from "@/components/Footer"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chemical Trading Company in Indonesia | PT Prosper Witta Sejahtera",
  description:
    "PT Prosper Witta Sejahtera is a trusted chemical trading company in Indonesia, supplying specialty chemicals for home care, industrial cleaner, water treatment, mining, oil & gas, textile, metal working, and veterinary applications.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Chemical Trading Company in Indonesia | PT Prosper Witta Sejahtera",
    description:
      "Trusted supplier of specialty chemicals for diverse industrial applications across Indonesia.",
    url: "/",
  },
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
