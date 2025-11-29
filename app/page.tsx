import Navbar from "@/components/Navbar";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection"
import ProductSection from "@/components/home/ProductSection"
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
