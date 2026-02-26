"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/* =========================
   Counter Component
========================= */
function Counter({ target }: { target: number }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;

        let start = 0;
        const duration = 1500;
        const increment = target / (duration / 16);

        const counter = setInterval(() => {
            start += increment;
            if (start >= target) {
                setCount(target);
                clearInterval(counter);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);

        return () => clearInterval(counter);
    }, [target, isInView]);

    return <span ref={ref}>{count}</span>;
}

/* =========================
   Hero Section
========================= */

export default function HeroSection() {
    const { t } = useLanguage();

    return (
        <section className="relative w-full min-h-screen overflow-hidden">

            {/* Background */}
            <div className="absolute inset-0 -z-10">
                <img
                    src="/header.png"
                    alt="Chemical Lab"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60" />
            </div>

            {/* Content */}
            <div className="relative min-h-screen flex flex-col justify-between text-white">

                {/* Text Section */}
                <div className="flex-1 flex flex-col justify-center max-w-6xl px-6 md:px-16 pt-32 mx-auto md:mx-0">

                    {/* Title Animation */}
                    <motion.h1
                        initial={{ x: -120, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-[32px] md:text-[60px] xl:text-[80px] font-bold font-maison leading-[1.05] text-center md:text-left"
                    >
                        {t("home.hero.title1")}
                        <span className="hidden md:block"></span>
                        {t("home.hero.title2")}
                    </motion.h1>

                    {/* Description Animation */}
                    <motion.p
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="text-gray-300 max-w-xl mt-6 text-md md:text-base text-center md:text-left mx-auto md:mx-0"
                    >
                        {t("home.hero.description")}
                    </motion.p>

                </div>

                {/* Stats + Button */}
                <div className="w-full px-6 md:px-16 pb-12 flex flex-col md:flex-row justify-center md:justify-between gap-10 md:gap-0 items-center">

                    {/* Stats Animation Container */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="flex flex-wrap justify-center gap-12 text-center md:text-left"
                    >

                        {/* Stat 1 */}
                        <div>
                            <h2 className="text-[42px] md:text-[50px] font-bold leading-[0.8]">
                                <Counter target={2} />
                            </h2>
                            <p className="text-gray-300 text-sm md:text-base">
                                <span>Years</span>
                                <span className="block md:inline"> Operating</span>
                            </p>
                        </div>

                        {/* Stat 2 */}
                        <div>
                            <h2 className="text-[42px] md:text-[50px] font-bold leading-[0.8]">
                                <Counter target={20} />+
                            </h2>
                            <p className="text-gray-300 text-sm md:text-base">
                                <span>Industry</span>
                                <span className="block md:inline"> Collaborator</span>
                            </p>
                        </div>

                        {/* Stat 3 */}
                        <div>
                            <h2 className="text-[42px] md:text-[50px] font-bold leading-[0.8]">
                                <Counter target={30} />+
                            </h2>
                            <p className="text-gray-300 text-sm md:text-base">
                                <span>Chemical</span>
                                <span className="block md:inline"> Products</span>
                            </p>
                        </div>

                    </motion.div>

                    {/* Button Animation */}
                    <motion.button
                        onClick={() => {
                            const section = document.getElementById("about");
                            section?.scrollIntoView({ behavior: "smooth" });
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        whileHover={{ scale: 1.05 }}
                        className="w-full md:w-auto border border-white text-center px-8 py-3 rounded-lg hover:bg-white hover:text-black transition"
                    >
                        Explore Now →
                    </motion.button>

                </div>
            </div>
        </section>
    );
}
