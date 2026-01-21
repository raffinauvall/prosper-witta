"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const cookies = document.cookie.split("; ").reduce((acc, cur) => {
      const [k, v] = cur.split("=");
      acc[k] = v;
      return acc;
    }, {} as Record<string, string>);

    const token = cookies["session_token"];
    if (token) {
      router.replace("/admin"); // aman, client-side redirect
    }
  }, [router]);

  return <>{children}</>;
}
