"use client";

import { v4 as uuidv4 } from "uuid";

const COOKIE_NAME = "device_token";

export function getDeviceToken(): string | null {
  if (typeof document === "undefined") return null;

  const match = document.cookie.match(
    new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`)
  );

  if (match) return match[1];

  try {
    const stored = localStorage.getItem(COOKIE_NAME);
    if (stored) {
      document.cookie = `${COOKIE_NAME}=${stored}; path=/; max-age=31536000; SameSite=Lax`;
      return stored;
    }
  } catch {}

  const token = uuidv4();

  document.cookie = `${COOKIE_NAME}=${token}; path=/; max-age=31536000; SameSite=Lax`;

  try {
    localStorage.setItem(COOKIE_NAME, token);
  } catch {}

  return token;
}
