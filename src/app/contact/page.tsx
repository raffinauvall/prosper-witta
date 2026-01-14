"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactHeader from "@/components/contact/ContactHeader";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-900 pt-6 md:pt-10">
      <Navbar />

      <div className="px-4 sm:px-6 pt-25 py-16 md:px-20 md:py-24">
        <ContactHeader />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 max-w-7xl mx-auto">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>

      <Footer />
    </div>
  );
}
