export function getDeviceToken() {
  let token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("device_token="))
    ?.split("=")[1];

  if (!token) {
    token = crypto.randomUUID();
    document.cookie = `device_token=${token}; path=/; max-age=${60 * 60 * 24 * 365}`;
  }

  return token;
}
