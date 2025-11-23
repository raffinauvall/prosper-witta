import Navbar from "@/components/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection"
import ProductSection from "@/components/sections/ProductSection"
import Footer from "@/components/Footer"
export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ProductSection />
      <Footer />
    </>
  );
}
