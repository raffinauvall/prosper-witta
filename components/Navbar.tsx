"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-50 px-6 md:px-10 py-6 flex items-center justify-between text-white">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-14 h-14  rounded-full flex items-center justify-center font-bold text-black">
            <img src="/logo.png" width={100} height={100} alt="" />
          </div>
          <span className="font-semibold text-lg font-maison leading-tight">
            Prosper <br /> Witta Sejahtera
          </span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-10 text-sm">
          <li><Link href="/" className="border-b-2 text-[20px] border-white pb-1">Home</Link></li>
          <li><Link href="#about" className="hover:opacity-80 text-[20px]">About</Link></li>
          <li><Link href="#product" className="hover:opacity-80 text-[20px]">Product</Link></li>
          <li><Link href="#contact" className="hidden md:inline-block bg-yellow-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition"
        >
          Contact us!
        </Link></li>
        </ul>

        {/* Desktop Button */}


        {/* Hamburger Button */}
        <button 
          onClick={() => setOpen(true)} 
          className="md:hidden text-2xl"
        >
          ☰
        </button>
      </nav>

      {/* Overlay Background */}
      <div
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Slide Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-[80%] max-w-sm bg-black text-white z-50 transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-6 py-6 border-b border-white/10">
          <span className="text-lg font-bold">Menu</span>
          <button onClick={() => setOpen(false)} className="text-2xl">✕</button>
        </div>

        <ul className="flex flex-col gap-6 px-6 py-10 text-lg">
          <li><Link onClick={() => setOpen(false)} href="/">Home</Link></li>
          <li><Link onClick={() => setOpen(false)} href="#about">About</Link></li>
          <li><Link onClick={() => setOpen(false)} href="#services">Services</Link></li>
          <li><Link onClick={() => setOpen(false)} href="#product">Product</Link></li>
        </ul>

        <div className="px-6 mt-10">
          <Link
            onClick={() => setOpen(false)}
            href="#contact"
            className="block bg-yellow-500 text-center text-white py-3 rounded-lg font-semibold hover:bg-yellow-400 transition"
          >
            Contact us!
          </Link>
        </div>
      </div>
    </>
  );
}
