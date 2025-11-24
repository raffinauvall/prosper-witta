export default function AboutSection() {
  return (
    <section id="about" className="bg-white py-24 px-6 md:px-16 text-white">
      
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="grid md:grid-cols-2 gap-16 items-start mb-20">
          
          <h2 className="text-3xl md:text-5xl font-bold leading-tight text-black">
            Supplying More Than Chemicals —

            <span className="block text-[#F5B400]">
              We Deliver Trust
            </span>
          </h2>

          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
           PT Prosper Witta Sejahtera is a chemical trading company which

established in 2024. We serve industrial applications such as : Home
& Personal Care, Institutional & Industrial Cleaner, Veterinary,
Mining, Water Treatment, Metal Working, and Oil & Gas.
          </p>
        </div>

        {/* Fitur */}
        <div className="grid md:grid-cols-2 gap-10 mt-16">

  {/* VISION */}
  <div className="relative border border-gray-700 rounded-2xl p-8 md:p-10 bg-gradient-to-br from-gray-900 to-gray-800 hover:shadow-xl transition">

    {/* Accent Line */}
    <div className="absolute top-6 right-6 h-12 w-[2px] bg-[#CFA54B]" />

    <span className="uppercase text-xs tracking-widest text-[#CFA54B]">
      Aspirasi
    </span>

    <h3 className="mt-3 text-2xl font-semibold text-white">
      Our Vision
    </h3>

    <div className="w-12 h-[2px] bg-[#CFA54B] mt-4 mb-6"></div>

    <p className="text-gray-300 leading-relaxed text-base">
      To establish ourselves as a globally recognized specialty company in 
      the Cleaning, Feed & Veterinary, and Mining industries by delivering 
      innovative products, reliable services, and sustainable solutions that 
      support industrial progress worldwide.
    </p>
  </div>

  {/* MISSION */}
  <div className="relative border border-gray-700 rounded-2xl p-8 md:p-10 bg-gradient-to-br from-gray-900 to-gray-800 hover:shadow-xl transition">

    {/* Accent Line */}
    <div className="absolute top-6 right-6 h-12 w-[2px] bg-[#CFA54B]" />

    <span className="uppercase text-xs tracking-widest text-[#CFA54B]">
      Strategi
    </span>

    <h3 className="mt-3 text-2xl font-semibold text-white">
      Our Mission
    </h3>

    <div className="w-12 h-[2px] bg-[#CFA54B] mt-4 mb-6"></div>

    <p className="text-gray-300 leading-relaxed text-base">
      To place our customers at the heart of everything we do by providing 
      consistent quality, reliable supply, exceptional service, and continuous 
      innovation that ensures long-term operational success and trusted
      partnerships.
    </p>
  </div>

</div>


      </div>

    </section>
  );
}
