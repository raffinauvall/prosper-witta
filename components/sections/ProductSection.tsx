export default function ProductSection() {
    return(
        <section 
  className="relative py-24 px-6 md:px-16 bg-cover bg-center"
  style={{ backgroundImage: "url('/productsec.jpg')" }}
>
  {/* Gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30"></div>

  <div className="relative z-10 max-w-5xl">
    <h2 className="text-[40px] md:text-[64px] font-bold font-maison text-white leading-tight">
      Powering Industries with <br /> Reliable Chemical Solutions
    </h2>

    <p className="mt-4 text-white/90 max-w-2xl text-base md:text-lg">
      Advanced chemical supply backed by trust, consistency, and long-term partnership.
    </p>

    <div className="mt-10">
      <a
        href="#product"
        className="inline-flex items-center border border-white px-8 py-4 rounded-lg text-white hover:bg-white hover:text-black transition"
      >
        Explore Products →
      </a>
    </div>
  </div>
</section>


    )
}