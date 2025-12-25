// src/lib/api/auth.ts

export interface LoginPayload {
  username: string;
  password: string;
}

export interface User {
  id: string | number;
  username: string;
}

export async function login(payload: LoginPayload) {
  const res = await fetch("/api/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Login gagal");
  }

  return data;
}

export async function logout() {
  const res = await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Logout gagal");
  }

  return true;
}

// Optional: get user info from JWT (server decoded)
export async function getUser() {
  const res = await fetch("/api/auth/me");

  if (!res.ok) return null;

  const data = await res.json();
  return data.user as User;
}
