import "../../styles/globals.css";
import "../../styles/font.css";
import React from "react";
import { LanguageProvider } from "@/context/LanguageContext";
import ScrollWrapper from "@/components/ScrollWrapper";
import {
  absoluteUrl,
  defaultOpenGraphImages,
  getSiteUrl,
} from "@/lib/seo";

export const metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default:
      "PT Prosper Witta Sejahtera — Chemical Trading Company in Indonesia",
    template: "%s | PT Prosper Witta Sejahtera",
  },
  description:
    "PT Prosper Witta Sejahtera is a leading chemical trading company in Indonesia, supplying specialty chemicals for home care, industrial cleaner, water treatment, mining, oil & gas, textile, metal working, and veterinary applications.",
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: absoluteUrl("/"),
    siteName: "PT Prosper Witta Sejahtera",
    title:
      "PT Prosper Witta Sejahtera — Chemical Trading Company in Indonesia",
    description:
      "Leading chemical trading company serving industrial applications across home care, industrial cleaner, water treatment, mining, oil & gas, textile, metal working, and veterinary sectors in Indonesia.",
    images: defaultOpenGraphImages,
  },
  twitter: {
    card: "summary_large_image",
    title:
      "PT Prosper Witta Sejahtera — Chemical Trading Company in Indonesia",
    description:
      "Leading chemical trading company serving industrial and specialty chemical applications in Indonesia.",
    images: [absoluteUrl("/og-image.jpg")],
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large" as const,
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-96.png", type: "image/png", sizes: "96x96" },
    ],
    shortcut: "/favicon.ico",
    apple: {
      url: "/apple-touch-icon.png",
      type: "image/png",
      sizes: "180x180",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteUrl = getSiteUrl();

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PT Prosper Witta Sejahtera",
    url: siteUrl,
    logo: absoluteUrl("/logo.png"),
    description:
      "Leading chemical trading company serving industrial and specialty chemical applications in Indonesia.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "ID",
    },
    sameAs: ["https://id.linkedin.com/company/pt-prosper-witta-sejahtera"],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+62-21-2188-5249",
      email: "admin@prosperwittasejahtera.com",
      contactType: "sales",
      areaServed: "ID",
    },
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "PT Prosper Witta Sejahtera",
    url: siteUrl,
  };

  return (
    <html lang="en">
      <body className="font-maison leading-normal">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
        <LanguageProvider>
          <ScrollWrapper>{children}</ScrollWrapper>
        </LanguageProvider>
      </body>
    </html>
  );
}
