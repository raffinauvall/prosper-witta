import "../../styles/globals.css";
import "../../styles/font.css";
import React from "react";
import { LanguageProvider } from "@/context/LanguageContext";
import ScrollWrapper from "@/components/ScrollWrapper";
import { absoluteUrl, getSiteUrl } from "@/lib/seo";

export const metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default:
      "PT Prosper Witta Sejahtera — Chemical Trading Company in Indonesia",
    template: "%s | PT Prosper Witta Sejahtera",
  },
  description:
    "PT Prosper Witta Sejahtera is a leading chemical trading company in Indonesia, supplying specialty chemicals for home care, industrial cleaner, water treatment, mining, oil & gas, textile, metal working, and veterinary applications.",
  keywords: [
    "chemical trading company Indonesia",
    "specialty chemicals supplier",
    "chemical distributor Indonesia",
    "home care chemicals",
    "industrial cleaner chemicals",
    "water treatment chemicals",
    "mining chemicals",
    "oil gas chemicals",
    "textile chemicals",
    "metal working chemicals",
    "veterinary chemicals",
    "PT Prosper Witta Sejahtera",
    "chemical supplier Jakarta",
  ],
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
    images: [
      {
        url: absoluteUrl("/logo.png"),
        width: 512,
        height: 512,
        alt: "PT Prosper Witta Sejahtera logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "PT Prosper Witta Sejahtera — Chemical Trading Company in Indonesia",
    description:
      "Leading chemical trading company serving industrial and specialty chemical applications in Indonesia.",
    images: [absoluteUrl("/logo.png")],
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large" as const,
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  verification: {},
  category: "Chemical Trading",
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
    sameAs: [],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "PT Prosper Witta Sejahtera",
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/products?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
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
