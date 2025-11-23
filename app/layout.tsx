import "../styles/globals.css";
import "../styles/font.css"
import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-maison">
        {children}
      </body>
    </html>
  );
}
