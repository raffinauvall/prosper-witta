"use client";
import "../../styles/globals.css";
import "../../styles/font.css";
import React from "react";
import { LanguageProvider } from "@/context/LanguageContext";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/overlayscrollbars.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-maison leading-normal">

        <OverlayScrollbarsComponent
          options={{
            scrollbars: {
              autoHide: "leave",
              theme: "os-theme-dark",
            },
          }}
          style={{ height: "100vh" }}
        >
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </OverlayScrollbarsComponent>

      </body>
    </html>
  );
}
