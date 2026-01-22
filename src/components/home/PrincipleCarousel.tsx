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
const ITEM_WIDTH = 328;
const AUTO_DELAY = 2000;``

export default function PrincipleCarousel() {
  const { t } = useLanguage();

  const BASE_INDEX = logos.length;
  const [index, setIndex] = useState(BASE_INDEX);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

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

  // ===== AUTO SLIDE =====
  useEffect(() => {
    if (paused) return;

    intervalRef.current = setInterval(() => {
      next();
    }, AUTO_DELAY);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [paused]);

  return (
    <section className="w-full py-10 bg-white overflow-hidden">
      <h2 className="text-center text-5xl font-bold mb-14 text-black">
        {t("home.principle.title")}
      </h2>

      <div className="max-w-6xl mx-auto flex items-center gap-6 px-6 overflow-hidden">
        {/* LEFT */}
        <button
          onClick={prev}
          className="h-12 w-12 rounded-full text-white bg-[#F5B400] shadow flex items-center justify-center hover:bg-yellow-600 flex-shrink-0"
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
            className="flex gap-10"
            style={{
              transform: `translateX(-${index * ITEM_WIDTH}px)`,
              transition: animate ? "transform 300ms ease-out" : "none",
            }}
          >
            {LOOP.map((logo, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-72 h-32 flex items-center justify-center"
              >
                <Image
                  src={logo}
                  alt="Company Logo"
                  width={260}
                  height={120}
                  className="object-contain pointer-events-none"
                />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <button
          onClick={next}
          className="h-12 w-12 rounded-full bg-[#F5B400] shadow text-white flex items-center justify-center hover:bg-yellow-600 flex-shrink-0"
        >
          ›
        </button>
      </div>
    </section>
  );
}
