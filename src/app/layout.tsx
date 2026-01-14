import "../../styles/globals.css";
import "../../styles/font.css";
import React from "react";
import { LanguageProvider } from "@/context/LanguageContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-maison leading-normal">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
