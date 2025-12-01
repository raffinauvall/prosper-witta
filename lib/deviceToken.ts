"use client";

import { useEffect, useState } from "react";

export function useDeviceToken() {
  const [deviceToken, setDeviceToken] = useState<string | null>(null);

  useEffect(() => {
    let token = localStorage.getItem("device_token");
    if (!token) {
      token = crypto.randomUUID();
      localStorage.setItem("device_token", token);
    }
    setDeviceToken(token);
  }, []);

  return deviceToken;
}
