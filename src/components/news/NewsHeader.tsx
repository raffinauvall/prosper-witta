"use client"

import { useLanguage } from "@/context/LanguageContext"

export default function NewsHeader() {
    const { t } = useLanguage();
    return (
        <>
            <section className="bg-white">
                <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col gap-1">
                    <h1 className="text-2xl font-semibold tracking-tight">
                        {t("news.title")}
                    </h1>
                    <p className="text-sm text-gray-500">
                        {t("news.subtitle")}
                    </p>
                </div>
            </section>
        </>
    )
}