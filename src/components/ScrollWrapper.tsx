"use client";

import { ReactNode, useEffect } from "react";
import "overlayscrollbars/overlayscrollbars.css";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

export default function ScrollWrapper({
  children,
}: {
  children: ReactNode;
}) {

  return (
    <OverlayScrollbarsComponent
      id="main-scroll"
      options={{
        scrollbars: {
          autoHide: "leave",
          theme: "os-theme-dark",
        },
      }}
      events={{
        scroll: (instance) => {
          const scrollTop = instance.elements().viewport.scrollTop;
          window.dispatchEvent(
            new CustomEvent("custom-scroll", {
              detail: scrollTop,
            })
          );
        },
      }}
      style={{ height: "100vh" }}
    >
      {children}
    </OverlayScrollbarsComponent>
  );
}
