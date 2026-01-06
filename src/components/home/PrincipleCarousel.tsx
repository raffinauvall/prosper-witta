"use client";

import Image from "next/image";
import { useRef } from "react";

const logos: string[] = [
  "/images/company/company1.png",
  "/images/company/company2.jfif",
  "/images/company/company3.png",
  "/images/company/company4.jpg",
  "/images/company/company5.jpg",
  "/images/company/company6.png",
];

export default function PrincipleCarousel() {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: "left" | "right"): void => {
    if (!sliderRef.current) return;

    const scrollAmount = sliderRef.current.clientWidth * 0.8;

    sliderRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full py-10 bg-white">
      <h2 className="text-center text-5xl  font-bold mb-15 text-black">
        Trusted by Our Partners
      </h2>

      {/* WRAPPER */}
      <div className="max-w-6xl mx-auto flex items-center gap-6 px-6">
        {/* BUTTON LEFT (LUAR) */}
        <button
          onClick={() => scroll("left")}
          className="
            h-12 w-12
            rounded-full
            text-white
            bg-[#F5B400] shadow
            flex items-center justify-center
            hover:bg-yellow-600
            
            flex-shrink-0
          "
          aria-label="Scroll Left"
        >
          ‹
        </button>

        {/* SLIDER */}
        <div
          ref={sliderRef}
          className="
            flex gap-10
            overflow-x-hidden
            overflow-y-hidden
            w-full
          "
        >
          {logos.map((logo: string, index: number) => (
            <div
              key={index}
              className="
                flex-shrink-0
                w-72
                h-32
                flex items-center justify-center
              "
            >
              <Image
                src={logo}
                alt="Company Logo"
                width={260}
                height={120}
                className="object-contain"
              />
            </div>
          ))}
        </div>

        {/* BUTTON RIGHT (LUAR) */}
        <button
          onClick={() => scroll("right")}
          className="
            h-12 w-12
            rounded-full
            bg-[#F5B400] shadow
            text-white
            flex items-center justify-center
            hover:bg-yellow-600
            flex-shrink-0
          "
          aria-label="Scroll Right"
        >
          ›
        </button>
      </div>
    </section>
  );
}
