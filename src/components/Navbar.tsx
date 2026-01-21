"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
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

    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [allowTransparent]);

  const textColor =
    scrolled || !allowTransparent ? "text-black" : "text-white";

  const underlineColor =
    scrolled || !allowTransparent ? "bg-[#d4af37]" : "bg-white";

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${
          scrolled
            ? "bg-white/80 backdrop-blur-md shadow-sm"
            : allowTransparent
            ? "bg-transparent"
            : "bg-white shadow-sm"
        }`}
      >
        <div className="relative px-6 md:px-10 py-4 flex items-center justify-between">

          {/* LOGO */}
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-14 h-auto object-contain"
            />

            <span
              className={`text-lg font-bold leading-tight ${textColor}`}
            >
              Prosper <br /> Witta Sejahtera
            </span>
          </div>

          {/* CENTER NAV */}
          <ul
            className={`hidden md:flex items-center gap-12
            text-[18px] font-medium tracking-tight
            absolute left-1/2 -translate-x-1/2 ${textColor}`}
          >
            {[
              { label: t("nav.home"), href: "/" },
              { label: t("nav.about"), href: "/about" },
              { label: t("nav.product"), href: "/products" },
              { label: t("nav.news"), href: "/news" },
              { label: t("nav.contact"), href: "/contact" },
            ].map((item) => {
              const active = pathname === item.href;

              return (
                <li key={item.href} className="relative group">
                  <Link
                    href={item.href}
                    className="opacity-80 hover:opacity-100 transition"
                  >
                    {item.label}
                  </Link>

                  <span
                    className={`absolute left-0 -bottom-1 h-[1.5px] w-full transition-transform duration-300
                    ${
                      active
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    } ${underlineColor}`}
                  />
                </li>
              );
            })}
          </ul>

          {/* RIGHT */}
          <div
            className={`hidden md:flex items-center gap-4
            ${textColor} opacity-80 hover:opacity-100 transition`}
          >
            <LanguageSwitcher />
          </div>

          {/* HAMBURGER */}
          <button
            onClick={() => setOpen(true)}
            className={`md:hidden text-2xl ${textColor}`}
          >
            ☰
          </button>
        </div>
      </nav>

      {/* OVERLAY */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* MOBILE MENU */}
      <div
        className={`fixed top-0 right-0 h-full w-[80%] max-w-sm bg-black text-white z-50
        transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-6 py-6 border-b border-white/10">
          <span className="text-lg font-semibold">{t("menu")}</span>
          <button onClick={() => setOpen(false)} className="text-xl">
            ✕
          </button>
        </div>

        <div className="px-6 mt-6 opacity-90">
          <LanguageSwitcher />
        </div>

        <ul className="flex flex-col gap-7 px-6 py-10 text-xl">
          {[
            { label: t("nav.home"), href: "/" },
            { label: t("nav.about"), href: "/about" },
            { label: t("nav.product"), href: "/products" },
            { label: t("nav.news"), href: "/news" },
            { label: t("nav.contact"), href: "/contact" },
          ].map((item) => (
            <li key={item.href}>
              <Link onClick={() => setOpen(false)} href={item.href}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
