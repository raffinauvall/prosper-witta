"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black text-white pt-20 pb-10 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* Company Info */}
        <div>
          <h3 className="text-xl font-bold tracking-wide mb-4">
            PT Prosper Witta Sejahtera
          </h3>

          <p className="text-white/70 text-sm leading-relaxed">
            {t("footer.company_desc_1")}
            <br />
            {t("footer.company_desc_2")}
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">
            {t("footer.quick_links")}
          </h4>

          <ul className="space-y-3 text-white/70 text-sm">
            <li><Link className="hover:text-white" href="/">{t("nav.home")}</Link></li>
            <li><Link className="hover:text-white" href="/about">{t("nav.about")}</Link></li>
            <li><Link className="hover:text-white" href="/products">{t("nav.product")}</Link></li>
            <li><Link className="hover:text-white" href="/news">{t("nav.news")}</Link></li>
            <li><Link className="hover:text-white" href="/contact">{t("nav.contact")}</Link></li>
          </ul>
        </div>

        {/* Products */}
        <div>
          <h4 className="text-lg font-semibold mb-4">
            {t("footer.products")}
          </h4>

          <ul className="space-y-3 text-white/70 text-sm">
            <li><Link href="/products/home-care">{t("products.categories.home.title")}</Link></li>
            <li><Link href="/products/industrial-cleaner">{t("products.categories.industrial.title")}</Link></li>
            <li><Link href="/products/veterinary">{t("products.categories.veterinary.title")}</Link></li>
            <li><Link href="/products/mining">{t("products.categories.mining.title")}</Link></li>
            <li><Link href="/products/water-treatment">{t("products.categories.water.title")}</Link></li>
            <li><Link href="/products/metal-working">{t("products.categories.metal.title")}</Link></li>
            <li><Link href="/products/oil-gas">{t("products.categories.oilGas.title")}</Link></li>
            <li><Link href="/products/textile-auxiliaries">{t("products.categories.textile.title")}</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-semibold mb-4">
            {t("footer.contact")}
          </h4>

          <ul className="space-y-3 text-white/70 text-sm">
            <li>{t("footer.address")}</li>
            <li>{t("footer.email")}</li>
            <li>{t("footer.phone")}</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 mt-16 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-white/50">
        <p>
          {t("footer.copyright").replace("{year}", String(year))}
        </p>

        <div className="flex space-x-6 mt-4 md:mt-0">

          <a
            href="https://wa.me/62811854992"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
            >
            {t("footer.social_whatsapp")}
            </a>
        </div>
      </div>
    </footer>
  );
}
