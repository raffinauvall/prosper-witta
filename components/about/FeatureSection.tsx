export default function FeatureSection() {
  return (
    <>
      {/* Fitur */}
      <div className="grid md:grid-cols-2 px-6 gap-10 mt-16">

        {/* VISION */}
        <div className="relative border border-gray-300 rounded-2xl p-8 md:p-10 bg-white shadow-sm hover:shadow-lg transition">
          
          {/* Accent Line */}
          <div className="absolute top-6 right-6 h-12 w-[2px] bg-[#CFA54B]" />

          <span className="uppercase text-xs tracking-widest text-[#CFA54B]">
            Aspirasi
          </span>

          <h3 className="mt-3 text-2xl font-semibold text-gray-900">
            Our Vision
          </h3>

          <div className="w-12 h-[2px] bg-[#CFA54B] mt-4 mb-6"></div>

          <p className="text-gray-700 leading-relaxed text-base">
            To establish ourselves as a globally recognized specialty company in 
            the Cleaning, Feed & Veterinary, and Mining industries by delivering 
            innovative products, reliable services, and sustainable solutions that 
            support industrial progress worldwide.
          </p>
        </div>

        {/* MISSION */}
        <div className="relative border border-gray-300 rounded-2xl p-8 md:p-10 bg-white shadow-sm hover:shadow-lg transition">
          
          {/* Accent Line */}
          <div className="absolute top-6 right-6 h-12 w-[2px] bg-[#CFA54B]" />

          <span className="uppercase text-xs tracking-widest text-[#CFA54B]">
            Strategi
          </span>

          <h3 className="mt-3 text-2xl font-semibold text-gray-900">
            Our Mission
          </h3>

          <div className="w-12 h-[2px] bg-[#CFA54B] mt-4 mb-6"></div>

          <p className="text-gray-700 leading-relaxed text-base">
            To place our customers at the heart of everything we do by providing 
            consistent quality, reliable supply, exceptional service, and continuous 
            innovation that ensures long-term operational success and trusted
            partnerships.
          </p>
        </div>

      </div>
    </>
  );
}
