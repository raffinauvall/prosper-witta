import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeatureSection from "@/components/about/FeatureSection";
import AboutHero from "@/components/about/AboutHero";
import CompanyProfile from "@/components/about/CompanyProfile";
import CoreValues from "@/components/about/CoreValues";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about PT Prosper Witta Sejahtera, a chemical trading company serving industrial and specialty chemical markets in Indonesia.",
  alternates: {
    canonical: "/about",
  },
}
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />

      <AboutHero />
      <CompanyProfile />

      <div className="md:px-20 px-6 max-w-7xl mx-auto">
        <FeatureSection />
      </div>

      <CoreValues />

      <Footer />
    </div>
  );
}
