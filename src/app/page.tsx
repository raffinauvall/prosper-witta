import Navbar from "@/components/Navbar";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection"
import PrincipleCarousel from "../components/home/PrincipleCarousel";
import ProductSection from "@/components/home/ProductSection"
import Footer from "@/components/Footer"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | PT Prosper Witta Sejahtera",
  description: "Home Page"
}
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
