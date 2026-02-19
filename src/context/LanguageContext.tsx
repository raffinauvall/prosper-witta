"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Lang = "id" | "en";

type LanguageContextType = {
    lang: Lang;
    setLang: (lang: Lang) => void;
    t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

/* ================= TRANSLATIONS ================= */

type Dictionary = Record<string, any>;

const dictionary: Record<Lang, Dictionary> = {
    id: {
        nav: {
            home: "Beranda",
            about: "Tentang",
            product: "Produk",
            contact: "Kontak Kami",
            news: "Berita"
        },

        home: {
            hero: {
                title1: "Solusi Kimia Terpercaya ",
                title2: "untuk Berbagai Inovasi Industri.",
                description:
                    "Menyediakan bahan kimia industri bersertifikasi dan berkualitas tinggi dengan pasokan yang andal, standar keselamatan ketat, serta kemitraan industri jangka panjang.",
            },
            principle: {
                title: "Dipercaya oleh Mitra Kami",
            },
            product: {
                title1: "Memberdayakan Industri Dengan",
                title2: "Solusi Kimia Yang Andal",
                subtitle:
                    "Pasokan bahan kimia canggih yang didukung oleh kepercayaan, konsistensi, dan kemitraan jangka panjang.",
            },
            about: {
                title1: "Menyuplai Lebih Dari Sekadar Bahan Kimia —",
                title2: "Kami Mengirimkan Kepercayaan",
                description: "PT Prosper Witta Sejahtera adalah perusahaan perdagangan kimia yang didirikan pada tahun 2024. Kami melayani aplikasi industri seperti: Home & Personal Care, Institutional & Industrial Cleaning, Veterinary, Mining, Water Treatment, dan Metal Working , Oil & Gas."
            }
        },

        about: {
            hero: {
                title: "Mendorong Kemajuan Industri Melalui -",
                highlight: "Solusi Kimia yang Andal",
                subtitle:
                    "PT Prosper Witta Sejahtera adalah perusahaan perdagangan bahan kimia yang berkomitmen menghadirkan solusi inovatif untuk berbagai kebutuhan industri.",
            },

            company: {
                title: "Tentang Perusahaan",
                desc1:
                    "PT Prosper Witta Sejahtera didirikan pada tahun 2024 sebagai perusahaan perdagangan bahan kimia yang fokus menyediakan produk dan solusi untuk berbagai sektor industri.",
                desc2:
                    "Kami melayani aplikasi industri seperti: Home & Personal Care, Institutional & Industrial Cleaner, Veterinary, Mining, Water Treatment, Metal Working.",
            },

            feature: {
                vision: {
                    badge: "Aspirasi",
                    title: "Visi Kami",
                    desc:
                        "Untuk memantapkan diri sebagai perusahaan spesialis yang diakui secara global dalam Home & Personal Care, Institutional Industrial Cleaning, Veterinary, Mining, Water Treatment, Metal Working, , layanan yang andal, dan solusi berkelanjutan.",
                },
                mission: {
                    badge: "Strategi",
                    title: "Misi Kami",
                    desc:
                        "Untuk menempatkan pelanggan sebagai pusat dari segala yang kami lakukan dengan menyediakan kualitas konsisten, pasokan andal, layanan luar biasa, dan inovasi berkelanjutan.",
                },
            },

            values: {
                badge: "Prinsip Kami",
                title: "Nilai Perusahaan",
                collaboration: {
                    title: "Kolaborasi",
                    desc:
                        "Bekerja bersama pelanggan dan partner untuk mencapai tujuan bersama.",
                },
                innovation: {
                    title: "Inovasi",
                    desc: "Selalu mencari solusi baru yang lebih efektif dan efisien.",
                },
                sustainability: {
                    title: "Keberlanjutan",
                    desc:
                        "Mendukung praktik industri yang aman dan ramah lingkungan.",
                },
            },
        },
        products: {
            hero: {
                title1: "Dibangun dengan Kualitas",
                title2: "Didorong oleh Kebutuhan Industri",
                subtitle:
                    "Mulai dari pembersih industri hingga pertambangan, veteriner, dan pengolahan air, kami menyediakan solusi kimia yang dirancang untuk kinerja, keamanan, dan pertumbuhan.",
            },

            categories: {
                title: "Kategori Produk Kami",
                subtitle:
                    "Solusi kimia khusus untuk mendukung berbagai sektor industri dengan kualitas dan keandalan yang konsisten.",

                home: {
                    title: "Perawatan Rumah & Personal",
                    desc: "Bahan kimia berkualitas tinggi untuk kebutuhan kebersihan, formulasi, dan produk perawatan pribadi.",
                },
                industrial: {
                    title: "Pembersih Institusional & Industri",
                    desc: "Bahan kimia pembersih kelas industri untuk pabrik, fasilitas, dan peralatan berat.",
                },
                veterinary: {
                    title: "Veteriner",
                    desc: "Solusi kimia untuk mendukung kesehatan hewan dan sistem biosekuriti.",
                },
                mining: {
                    title: "Pertambangan",
                    desc: "Bahan kimia khusus untuk pengemulsi peledak.",
                },
                water: {
                    title: "Pengolahan Air",
                    desc: "Solusi pemurnian dan pengolahan air untuk sektor industri dan biosida",
                },
                metal: {
                    title: "Pengolahan Logam",
                    desc: "Bahan kimia untuk proses logam, cairan mesin, dan perlakuan permukaan.",
                },

            },
            search: "Cari Produk...",
            msds: "Menyediakan informasi mengenai keselamatan, penanganan, penyimpanan, dan peraturan terkait produk ini.",
            tds: "Menyediakan data kinerja teknis, panduan aplikasi, dan informasi penanganan untuk produk ini.",

            sample: {
                title: "Minta Sampel Produk",
                description: "Ajukan permintaan sample produk untuk keperluan evaluasi dan pengujian internal.",
                badge: "Sample dikirim dalam kemasan 100ml"
            },
            status:{
                pending: "⏳ Permintaan akses Anda saat ini sedang ditinjau.",
                approved: "✅ Akses diberikan. Anda sekarang dapat melihat dokumen tersebut.",
                rejected: "❌ Permintaan Anda tidak disetujui. Anda dapat mengirimkan permintaan baru.",
                none: "🔒 Akses ke dokumen ini dibatasi. Ajukan permohonan akses untuk melanjutkan.",
                unavailable: "Dokumen belum ada"
            },
            button: {
                pending: "Menunggu Persetujuan",
                approved: "Lihat Dokumen",
                rejected: "Minta Lagi",
                none: "Minta Akses",
                sample: "Minta Sampel"
            }
        },
        news: {
            title: "Berita Perusaaan",
            subtitle: "Informasi dan pengumuman terbaru dari perusahaan kami"
        },
        contact: {
            badge: "Hubungi Kami",
            title: "Hubungi",
            highlight: "Kami",
            subtitle:
                "Kami siap membantu Anda kapan saja. Silakan hubungi kami melalui form atau kontak resmi berikut untuk informasi lebih lanjut.",
            contactInfo: "Informasi Kontak",
            formTitle: "Kirim Pesan",

            email: "Email",
            phone: "Telepon",
            address: "Alamat Kantor",

            name: "Nama",
            namePlaceholder: "Nama lengkap Anda",
            emailPlaceholder: "Alamat email Anda",
            message: "Pesan",
            messagePlaceholder: "Tulis pesan Anda di sini...",
            submit: "Kirim Pesan",
            thankYouTitle: "Terimakasih!",
            thankYouMessage: "Pesan anda sudah kami terima. Tim kami akan segera menghubungi anda"
        },

        footer: {
            company_desc_1: "Menyuplai Lebih Dari Sekadar Bahan Kimia — Kami Mengirimkan Kepercayaan.",
            company_desc_2:
                "Bermitra dengan industri melalui solusi kimia yang andal, konsisten, dan berperforma tinggi.",

            quick_links: "Tautan Cepat",
            products: "Produk Kami",
            contact: "Kontak",

            address: "Jakarta, Indonesia",
            email: "admin@prosperwittasejahtera.com",
            phone: "(021) 2188 5249",

            copyright:
                "© {year} PT Prosper Witta Sejahtera. Hak cipta dilindungi undang-undang.",

            social_linkedin: "LinkedIn",
            social_whatsapp: "WhatsApp",
        }


    },

    en: {
        nav: {
            home: "Home",
            about: "About",
            product: "Product",
            contact: "Contact Us",
            news: "News",
        },

        home: {
            hero: {
                title1: "Trusted Chemical Solutions ",
                title2: "For Various Industrial Innovations.",
                description:
                    "Delivering certified, high-quality industrial chemicals with reliable supply, strict safety standards, and long-term industry partnership.",
            },
            about: {
                title1: "Supplying More Than Chemicals",
                title2: "We Deliver Trust",
                description:
                    "PT Prosper Witta Sejahtera is a chemical trading company established in 2024. We serve industrial applications such as Home & Personal Care, Institutional & Industrial Cleaning, Veterinary, Mining, Water Treatment, and Metal Working and Oil & Gas.",
            },
            principle: {
                title: "Trusted by Our Partners",
            },
            product: {
                title1: "Powering Industries with",
                title2: "Reliable Chemical Solutions",
                subtitle:
                    "Advanced chemical supply backed by trust, consistency, and long-term partnership.",
            },
        },

        about: {
            hero: {
                title: "Driving Industrial Progress Through",
                highlight: "Reliable Chemical Solutions.",
                subtitle:
                    "PT Prosper Witta Sejahtera is a chemical trading company committed to delivering innovative and dependable solutions for diverse industrial needs.",
            },

            company: {
                title: "Company Overview",
                desc1:
                    "PT Prosper Witta Sejahtera was established in 2024 as a chemical trading company focused on providing high-quality products and solutions across multiple industrial sectors.",
                desc2:
                    "We serve industries including Home & Personal Care, Institutional & Industrial Cleaning, Veterinary, Mining, Water Treatment, and Metal Working.",
            },

            feature: {
                vision: {
                    badge: "Aspiration",
                    title: "Our Vision",
                    desc:
                        "To establish ourselves as a globally recognized specialist company in the Home & Personal Care, Institutional Industrial Cleaning, Veterinary, Mining, Water Treatment, Metal Working,  reliable services, and sustainable solutions.",
                },
                mission: {
                    badge: "Strategy",
                    title: "Our Mission",
                    desc:
                        "To place customers at the center of everything we do by delivering consistent quality, reliable supply, exceptional service, and continuous innovation.",
                },
            },

            values: {
                badge: "Our Principles",
                title: "Company Values",
                collaboration: {
                    title: "Collaboration",
                    desc:
                        "Working closely with customers and partners to achieve shared goals and long-term success.",
                },
                innovation: {
                    title: "Innovation",
                    desc:
                        "Continuously seeking new and better solutions to improve efficiency, performance, and value.",
                },
                sustainability: {
                    title: "Sustainability",
                    desc:
                        "Supporting safe, responsible, and environmentally sustainable industrial practices.",
                },
            },
        },

        products: {
            hero: {
                title1: "Built on Quality",
                title2: "Driven by Industrial Needs",
                subtitle:
                    "From industrial cleaning to mining, veterinary, water treatment, and metal processing, we provide chemical solutions designed for performance, safety, and long-term reliability.",
            },

            categories: {
                title: "Our Product Categories",
                subtitle:
                    "Specialized chemical solutions designed to support diverse industrial sectors with consistent quality and dependable performance.",

                home: {
                    title: "Home & Personal Care",
                    desc:
                        "High-quality chemical ingredients for hygiene products, personal care formulations, and household applications.",
                },
                industrial: {
                    title: "Institutional & Industrial Cleaner",
                    desc:
                        "Industrial-grade cleaning chemicals for factories, facilities, equipment, and heavy-duty applications.",
                },
                veterinary: {
                    title: "Veterinary",
                    desc:
                        "Chemical solutions formulated to support animal health, hygiene, and biosecurity systems.",
                },
                mining: {
                    title: "Mining",
                    desc:
                        "Specialized chemical for explosive emulsifiers.",
                },
                water: {
                    title: "Water Treatment",
                    desc:
                        "Chemical solutions for water purification, treatment, and biocides.",
                },
                metal: {
                    title: "Metal Working",
                    desc:
                        "Chemicals designed for metal processing, machining fluids, surface treatment, and corrosion control.",
                },
            },
            search: "Search Product...",
            msds: "Provides safety, handling, storage, and regulatory information related to this product.",
            tds: "Provides technical performance data, application guidance, and handling information for this product.",
            sample: {
                title: "Request Sample Product",
                description: "Submit a product sample request for internal evaluation and testing purposes.",
                badge: "Samples are sent in 100ml packaging."
            },
            status:{
                pending: "⏳ Your access request is currently under review.",
                approved: "✅ Access granted. You can now view the document.",
                rejected: "❌ Your request was not approved. You may submit a new request.",
                none: "🔒 Access to this document is restricted. Request access to continue",
                unavailable: "Documents don't exist yet"
            },
            button: {
                pending: "Pending Approval",
                approved: "View Document",
                rejected: "Request Again",
                none: "Request Access",
                sample: "Request Sample"
            }
        },
        news: {
            title: "Company News",
            subtitle: "Latest updates and announcements from our company"
        },

        contact: {
            badge: "Contact Us",
            title: "Contact",
            highlight: "Us",
            subtitle:
                "We are ready to assist you at any time. Please reach out to us through the form or the official contact information below for further inquiries.",
            contactInfo: "Contact Information",
            formTitle: "Send Message",

            email: "Email",
            phone: "Phone",
            address: "Office Address",

            name: "Name",
            namePlaceholder: "Your full name",
            emailPlaceholder: "Your email address",
            message: "Message",
            messagePlaceholder: "Write your message here...",
            submit: "Send Message",
            thankYouTitle: "Thank you!",
            thankYouMessage: "We have received your message. Our team will contact you soon."
        },

        footer: {
            company_desc_1:
                "Supplying More Than Chemicals — We Deliver Trust.",
            company_desc_2:
                "Partnering industries with reliable, consistent, and high-performance chemical solutions.",

            quick_links: "Quick Links",
            products: "Our Products",
            contact: "Contact Us",

            address: "Jakarta, Indonesia",
            email: "admin@prosperwittasejahtera.com",
            phone: "(021) 2188 5249",

            copyright:
                "© {year} PT Prosper Witta Sejahtera. All rights reserved.",

            social_linkedin: "LinkedIn",
            social_whatsapp: "WhatsApp",
        },
    },

};

/* ================= HELPER ================= */

function getNestedValue(obj: any, path: string) {
    return path.split(".").reduce((acc, key) => acc?.[key], obj);
}

/* ================= PROVIDER ================= */

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [lang, setLang] = useState<Lang>("en");

    useEffect(() => {
        const saved = localStorage.getItem("lang") as Lang | null;
        if (saved) setLang(saved);
    }, []);

    const changeLang = (value: Lang) => {
        setLang(value);
        localStorage.setItem("lang", value);
    };

    const t = (key: string) => {
        const value = getNestedValue(dictionary[lang], key);
        return value || key;
    };

    return (
        <LanguageContext.Provider value={{ lang, setLang: changeLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export const useLanguage = () => {
    const ctx = useContext(LanguageContext);
    if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
    return ctx;
};
