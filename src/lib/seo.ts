const fallbackSiteUrl = "https://prosperwitta.com";

export function getSiteUrl() {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.BASE_URL ||
    fallbackSiteUrl;

  return raw.replace(/\/$/, "");
}

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalizedPath}`;
}
