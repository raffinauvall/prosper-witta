
"use client"; 

import dynamic from "next/dynamic";

const DocumentPage = dynamic(
  () => import("@/components/document/DocumentPage"),
  { ssr: false } 
);

export default function Page() {
  return <DocumentPage />;
}
