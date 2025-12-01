// lib/deviceToken.ts
import { cookies } from "next/headers";

export function getDeviceToken(): string {
  // Cek cookie dulu
  let deviceToken = "";
  if (typeof window !== "undefined") {
    deviceToken = localStorage.getItem("device_token") || "";
    if (!deviceToken) {
      deviceToken = crypto.randomUUID();
      localStorage.setItem("device_token", deviceToken);
    }
  }
  return deviceToken;
}
