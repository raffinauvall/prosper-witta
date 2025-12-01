// lib/deviceToken.ts
export function getDeviceToken(): string {
  if (typeof window === "undefined") return "";

  let token = localStorage.getItem("device_token");
  if (!token) {
    token = crypto.randomUUID();
    localStorage.setItem("device_token", token);
  }
  return token;
}
