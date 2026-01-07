"use client"
import { useLanguage } from "@/src/context/LanguageContext";

export default function HeroSection() {

  const { t } = useLanguage();
  return (
    <section className="relative w-full min-h-screen overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/header.jpg"
          alt="Chemical Lab"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Hero Content */}
      <div className="relative min-h-screen flex flex-col justify-between text-white">

        {/* Text Section */}
        <div className="flex-1 flex flex-col justify-center max-w-6xl px-6 md:px-16 pt-32 mx-auto md:mx-0">
          <h1 className="text-[32px] md:text-[60px] xl:text-[80px] font-bold font-maison leading-[1.05] text-center md:text-left">
            {t("home.hero.title1")}
            <span className="hidden md:block"></span>
            {t("home.hero.title2")}
          </h1>

          <p className="text-gray-300 max-w-xl mt-6 text-md md:text-base text-center md:text-left mx-auto md:mx-0">
            {t("home.hero.description")}
          </p>
        </div>

        {/* Stats + Button */}
        <div className="w-full px-6 md:px-16 pb-12 flex flex-col md:flex-row justify-center md:justify-between gap-10 md:gap-0 items-center">

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-12 text-center md:text-left">

            {/* Stat 1 */}
            <div>
              <h2 className="text-[42px] md:text-[50px] font-bold leading-[0.8]">
                2
              </h2>
              <p className="text-gray-300 text-sm md:text-base">
                <span>Years</span>
                <span className="block md:inline"> Operating</span>
              </p>
            </div>

            {/* Stat 2 */}
            <div>
              <h2 className="text-[42px] md:text-[50px] font-bold leading-[0.8]">
                80+
              </h2>
              <p className="text-gray-300 text-sm md:text-base">
                <span>Industry</span>
                <span className="block md:inline"> Collaborator</span>
              </p>
            </div>

            {/* Stat 3 */}
            <div>
              <h2 className="text-[42px] md:text-[50px] font-bold leading-[0.8]">
                99+
              </h2>
              <p className="text-gray-300 text-sm md:text-base">
                <span>Chemical</span>
                <span className="block md:inline"> Products</span>
              </p>
            </div>

          </div>

          {/* Button Full di Mobile */}
          <a
            href="#explore"
            className="w-full md:w-auto border border-white text-center px-8 py-3 rounded-lg hover:bg-white hover:text-black transition"
          >
            Explore Now →
          </a>

        </div>
      </div>
    </section>
  );
}
