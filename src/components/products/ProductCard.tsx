"use client";

import Link from "next/link";
import Image from "next/image";

type Props = {
  title: string;
  desc: string;
  image: string;
  slug: string;
};

export default function ProductCard({
  title,
  desc,
  image,
  slug,
}: Props) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition transform hover:-translate-y-1">
      <Link href={`/products/${slug}`} className="block relative w-full h-56">
        <div className="relative w-full h-full group">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
      </Link>

      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{desc}</p>

        <div className="flex items-center justify-between">
          <Link
            href={`/products/${slug}`}
            className="text-[#CFA54B] font-medium hover:underline"
          >
            View Category →
          </Link>

          <Link
            href={`/products/${slug}`}
            className="text-xs py-1 px-3 border border-gray-200 rounded-full hover:bg-gray-100"
          >
            Explore
          </Link>
        </div>
      </div>
    </div>
  );
}
