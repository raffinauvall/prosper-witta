"use client";

import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const logos = [
  "/images/company/company1.png",
  "/images/company/company2.jpg",
  "/images/company/company3.png",
  "/images/company/company4.jpg",
  "/images/company/company5.jpg",
  "/images/company/company6.png",
];

const LOOP = [...logos, ...logos, ...logos];
const DESKTOP_ITEM_WIDTH = 328;
const AUTO_DELAY = 2000;

export default function PrincipleCarousel() {
  const { t } = useLanguage();

  const BASE_INDEX = logos.length;

  const [index, setIndex] = useState(BASE_INDEX);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const [itemWidth, setItemWidth] = useState(DESKTOP_ITEM_WIDTH);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // RESPONSIVE WIDTH
  useEffect(() => {
    const updateWidth = () => {
      setItemWidth(
        window.innerWidth < 768
          ? window.innerWidth
          : DESKTOP_ITEM_WIDTH
      );
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const next = () => {
    setAnimate(true);
    setIndex((i) => i + 1);
  };

  const prev = () => {
    setAnimate(true);
    setIndex((i) => i - 1);
  };

  const handleTransitionEnd = () => {
    if (index >= BASE_INDEX + logos.length) {
      setAnimate(false);
      setIndex(BASE_INDEX);
    }

    if (index < BASE_INDEX) {
      setAnimate(false);
      setIndex(BASE_INDEX + logos.length - 1);
    }
  };

useEffect(() => {
  if (paused) return;

  intervalRef.current = setInterval(next, AUTO_DELAY);

  return () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };
}, [paused]);

  return (
    <section className="w-full py-10 bg-white overflow-hidden">
      <h2 className="text-center text-4xl md:text-5xl font-bold mb-14 text-black">
        {t("home.principle.title")}
      </h2>

      <div className="max-w-6xl mx-auto flex items-center gap-6 md:px-6 overflow-hidden">
        {/* LEFT */}
        <button
          onClick={prev}
          className="hidden md:flex h-12 w-12 rounded-full bg-[#F5B400] text-white shadow items-center justify-center hover:bg-yellow-600"
        >
          ‹
        </button>

        {/* VIEWPORT */}
        <div
          className="overflow-hidden w-full"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            onTransitionEnd={handleTransitionEnd}
            className="flex"
            style={{
              transform: `translateX(-${index * itemWidth}px)`,
              transition: animate ? "transform 300ms ease-out" : "none",
            }}
          >
            {LOOP.map((logo, i) => (
              <div
                key={i}
                style={{ width: itemWidth }}
                className="flex-shrink-0 h-40 md:h-32 flex items-center justify-center"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={logo}
                    alt="Company Logo"
                    fill
                    className="object-contain px-10 pointer-events-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <button
          onClick={next}
          className="hidden md:flex h-12 w-12 rounded-full bg-[#F5B400] text-white shadow items-center justify-center hover:bg-yellow-600"
        >
          ›
        </button>
      </div>
    </section>
  );
}
