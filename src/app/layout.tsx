import "../../styles/globals.css";
import "../../styles/font.css";
import React from "react";
import { LanguageProvider } from "@/context/LanguageContext";
import ScrollWrapper from "@/components/ScrollWrapper";

export const metadata = {
  title: {
    default: "PT Prosper Witta Sejahtera",
    template: "%s | PT Prosper Witta Sejahtera",
  },
  description:
    "PT Prosper Witta Sejahtera is a chemical trading company serving industrial applications such as Home & Personal Care and Institutional sectors.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-maison leading-normal">
        <LanguageProvider>
          <ScrollWrapper>{children}</ScrollWrapper>
        </LanguageProvider>
      </body>
    </html>
  );
}
