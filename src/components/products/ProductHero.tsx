"use client";

import Navbar from "@/src/components/Navbar";
import { useLanguage } from "@/src/context/LanguageContext";

export default function ProductHero() {
  const { t } = useLanguage();

  return (
    <section className="relative flex flex-col">
      <div className="absolute inset-0">
        <img
          src="/productsec.jpg"
          alt="Chemical Industry"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <Navbar />

      <div className="relative z-10 flex-1 flex items-center justify-center px-6 pt-36 pb-24">
        <div className="max-w-4xl text-center">
          <h1 className="text-[40px] text-white md:text-[64px] xl:text-[72px] font-bold leading-tight">
            {t("products.hero.title1")}
            <span className="block">{t("products.hero.title2")}</span>
          </h1>

          <p className="mt-6 text-white text-base md:text-lg">
            {t("products.hero.subtitle")}
          </p>
        </div>
      </div>
    </section>
  );
}
