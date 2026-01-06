import Navbar from "@/src/components/Navbar";
import HeroSection from "@/src/components/home/HeroSection";
import AboutSection from "@/src/components/home/AboutSection"
import PrincipleCarousel from "../components/home/PrincipleCarousel";
import ProductSection from "@/src/components/home/ProductSection"
import Footer from "@/src/components/Footer"
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
