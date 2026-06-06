import "../../styles/globals.css";
import "../../styles/font.css";
import React from "react";
import { LanguageProvider } from "@/context/LanguageContext";
import ScrollWrapper from "@/components/ScrollWrapper";
import { absoluteUrl, getSiteUrl } from "@/lib/seo";

export const metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "PT Prosper Witta Sejahtera",
    template: "%s | PT Prosper Witta Sejahtera",
  },
  description:
    "PT Prosper Witta Sejahtera is a chemical trading company serving industrial applications such as Home & Personal Care and Institutional sectors.",
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    type: "website",
    url: absoluteUrl("/"),
    siteName: "PT Prosper Witta Sejahtera",
    title: "PT Prosper Witta Sejahtera",
    description:
      "Chemical trading company serving industrial applications across home care, industrial cleaner, water treatment, mining, oil & gas, textile, metal working, and veterinary sectors.",
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
    title: "PT Prosper Witta Sejahtera",
    description:
      "Chemical trading company serving industrial and specialty chemical applications in Indonesia.",
    images: [absoluteUrl("/logo.png")],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PT Prosper Witta Sejahtera",
    url: getSiteUrl(),
    logo: absoluteUrl("/logo.png"),
    description:
      "Chemical trading company serving industrial and specialty chemical applications.",
  };

  return (
    <html lang="en">
      <body className="font-maison leading-normal">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <LanguageProvider>
          <ScrollWrapper>{children}</ScrollWrapper>
        </LanguageProvider>
      </body>
    </html>
  );
}
