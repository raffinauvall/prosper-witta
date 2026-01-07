"use client";

import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import FeatureSection from "@/src/components/about/FeatureSection";
import AboutHero from "@/src/components/about/AboutHero";
import CompanyProfile from "@/src/components/about/CompanyProfile";
import CoreValues from "@/src/components/about/CoreValues";

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
