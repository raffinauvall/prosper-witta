import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function ProductPage() {
  return (
    <main className="bg-white text-[#0A0D12] overflow-hidden">

      {/* HERO SECTION */}
      <section className="relative flex flex-col">

        {/* Background */}
        <div className="absolute inset-0">
          <img 
            src="/productsec.jpg" 
            alt="Chemical Industry" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/85" />
        </div>

        <Navbar />

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex items-center justify-center px-6 pt-36 pb-24">
          <div className="max-w-4xl text-center">
            <h1 className="text-[40px] text-white md:text-[64px] xl:text-[72px] font-bold leading-tight">
              Built on Quality  
              <span className="block">Driven by Industrial Needs</span>
            </h1>

            <p className="mt-6 text-white text-base md:text-lg">
              From industrial cleaning to mining, veterinary, and water treatment, 
              we provide chemical solutions tailored for performance, safety, and growth.
            </p>
          </div>
        </div>
      </section>

      {/* CATEGORY SECTION */}
      <section className="py-24 px-6 md:px-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">

          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Our Product Categories
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Specialized chemical solutions built to support different 
              industrial sectors with consistent quality and reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {[
              {
                title: "Home & Personal Care",
                desc: "High-quality chemicals for daily hygiene, formulation, and personal care products."
              },
              {
                title: "Institutional & Industrial Cleaner",
                desc: "Industrial-grade cleaning chemicals for plants, facilities, and heavy equipment."
              },
              {
                title: "Veterinary",
                desc: "Chemical solutions supporting animal health and biosecurity systems."
              },
              {
                title: "Mining",
                desc: "Specialized chemicals for mineral processing, flotation, and mining performance."
              },
              {
                title: "Water Treatment",
                desc: "Water purification & treatment solutions for industrial and commercial sectors."
              },
              {
                title: "Metal Working",
                desc: "Chemicals for metal processing, machining fluids, and surface treatments."
              }
            ].map((cat, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition hover:border-[#CFA54B]"
              >
                <h3 className="text-xl font-semibold mb-3">
                  {cat.title}
                </h3>

                <p className="text-gray-600 text-sm mb-6">
                  {cat.desc}
                </p>

                <a
                  href="#"
                  className="text-[#CFA54B] font-medium hover:underline"
                >
                  View Category →
                </a>
              </div>
            ))}

          </div>
        </div>
      </section>

     

     

      <Footer />

    </main>
  );
}
