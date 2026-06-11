import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeatureSection from "@/components/about/FeatureSection";
import AboutHero from "@/components/about/AboutHero";
import CompanyProfile from "@/components/about/CompanyProfile";
import CoreValues from "@/components/about/CoreValues";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — Company Profile & Vision",
  description:
    "Learn about PT Prosper Witta Sejahtera, a chemical trading company with expertise in specialty chemical distribution for industrial and commercial markets across Indonesia.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About PT Prosper Witta Sejahtera",
    description:
      "Discover our company profile, vision, mission, and core values as a leading chemical trading company in Indonesia.",
    url: "/about",
  },
};
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
