"use client";

import { ReactNode } from "react";
import "overlayscrollbars/overlayscrollbars.css";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
export default function ScrollWrapper({ children }: { children: ReactNode }) {
  return (
    <OverlayScrollbarsComponent
      options={{
        scrollbars: {
          autoHide: "leave",
          theme: "os-theme-dark",
        },
      }}
      style={{ height: "100vh" }}
    >
      {children}
    </OverlayScrollbarsComponent>
  );
}
