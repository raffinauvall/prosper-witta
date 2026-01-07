"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/src/context/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const allowTransparent =
    pathname === "/" || pathname === "/products" || pathname === "/about";

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!allowTransparent) {
      setScrolled(true);
      return;
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [allowTransparent]);

  // ===== UNDERLINE COLOR =====
  const underlineColor =
    scrolled || !allowTransparent ? "bg-[#d4af37]" : "bg-white";

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 px-6 md:px-10 py-5 flex items-center justify-between transition-all duration-300
        ${
          scrolled
            ? "bg-white shadow-md text-black"
            : allowTransparent
            ? "bg-transparent text-white"
            : "bg-white shadow-md text-black"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-14 h-14 flex items-center justify-center">
            <img src="/logo.png" width={100} height={100} alt="Logo" />
          </div>

          <span
            className={`font-semibold text-lg font-maison leading-tight transition ${
              scrolled || !allowTransparent ? "text-black" : "text-white"
            }`}
          >
            Prosper <br /> Witta Sejahtera
          </span>
        </div>

        {/* Desktop menu */}
        <ul
          className={`hidden md:flex items-center gap-10 text-sm transition ${
            scrolled || !allowTransparent ? "text-black" : "text-white"
          }`}
        >
          {[
            { label: t("nav.home"), href: "/" },
            { label: t("nav.about"), href: "/about" },
            { label: t("nav.product"), href: "/products" },
          ].map((item) => {
            const isActive = pathname === item.href;

            return (
              <li key={item.href} className="relative group text-[20px]">
                <Link href={item.href}>{item.label}</Link>

                {/* Hover underline */}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${underlineColor}`}
                />

                {/* Active underline */}
                {isActive && (
                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] w-full ${underlineColor}`}
                  />
                )}
              </li>
            );
          })}

          {/* Contact Button */}
          <li>
            <Link
              href="/contact"
              className={`hidden md:inline-block px-5 py-2 rounded-lg font-semibold transition text-[16px]
              ${
                scrolled || !allowTransparent
                  ? "bg-yellow-500 text-white hover:bg-yellow-400"
                  : "border border-white text-white hover:bg-white hover:text-black"
              }`}
            >
              {t("nav.contact")}
            </Link>
          </li>

          {/* Language Switcher */}
          <li>
            <LanguageSwitcher />
          </li>
        </ul>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(true)}
          className={`md:hidden text-2xl ${
            scrolled || !allowTransparent ? "text-black" : "text-white"
          }`}
        >
          ☰
        </button>
      </nav>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Slide menu */}
      <div
        className={`fixed top-0 right-0 h-full w-[80%] max-w-sm bg-black text-white z-50 transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-6 py-6 border-b border-white/10">
          <span className="text-lg font-bold">{t("menu")}</span>
          <button onClick={() => setOpen(false)} className="text-2xl">
            ✕
          </button>
        </div>

        {/* Language Switcher Mobile */}
        <div className="px-6 mt-6">
          <LanguageSwitcher />
        </div>

        <ul className="flex flex-col gap-6 px-6 py-10 text-lg">
          <li>
            <Link onClick={() => setOpen(false)} href="/">
              {t("nav.home")}
            </Link>
          </li>
          <li>
            <Link onClick={() => setOpen(false)} href="/about">
              {t("nav.about")}
            </Link>
          </li>
          <li>
            <Link onClick={() => setOpen(false)} href="/products">
              {t("nav.product")}
            </Link>
          </li>
        </ul>

        <div className="px-6 mt-10">
          <Link
            onClick={() => setOpen(false)}
            href="/contact"
            className="block bg-yellow-500 text-center text-white py-3 rounded-lg font-semibold hover:bg-yellow-400 transition"
          >
            {t("nav.contact")}
          </Link>
        </div>
      </div>
    </>
  );
}
