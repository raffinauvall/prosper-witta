import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/header.jpg"
          alt="Chemical Lab"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <Navbar />

      {/* Hero Content */}
      <div className="relative z-10 h-full flex flex-col justify-between text-white">

        {/* Hero Text Container */}
      {/* Text Section (Tengah) */}
<div className="flex-1 flex flex-col justify-center max-w-6xl px-16 pt-20">
  <h1 className="text-[36px] md:text-[60px] xl:text-[80px] font-bold font-maison leading-[1.05]">
    Trusted Chemical Solutions <br />
    for a Better Industry.
  </h1>

  <p className="text-gray-300 max-w-xl mt-6">
    Delivering certified, high-quality industrial chemicals with reliable 
    supply, strict safety standards, and long-term industry partnership.
  </p>
</div>

{/* Stats Section (Bawah) */}
<div className="w-full px-16 pb-14 flex justify-between items-end">
  
  {/* Stats Left */}
  <div className="flex gap-10 pt-4">
    <div className="border-r-2 border-white pe-4">
      <h2 className="text-[50px] font-bold leading-[0.8]">2</h2>
      <p className="text-[20px] text-gray-300">Years operating</p>
    </div>

    <div className="border-r-2 border-white pe-4">
      <h2 className="text-[50px] font-bold leading-[0.8]">80+</h2>
      <p className="text-[20px] text-gray-300">Industry Collaborator</p>
    </div>

    <div>
      <h2 className="text-[50px] font-bold leading-[0.8]">99+</h2>
      <p className="text-[20px] text-gray-300">Chemical Products</p>
    </div>
  </div>

  {/* Button Right */}
  <a
    href="#explore"
    className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-black transition flex items-center gap-2"
  >
    Explore Now →
  </a>
</div>

      </div>
    </main>
  );
}
