const fallbackSiteUrl = "https://prosperwittasejahtera.com";

export function getSiteUrl() {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.BASE_URL ||
    fallbackSiteUrl;

  return raw
    .replace(/\/$/, "")
    .replace(
      /^http:\/\/(?:www\.)?prosperwittasejahtera\.com$/,
      fallbackSiteUrl
    );
}

export function absoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalizedPath}`;
}

export const defaultOpenGraphImages = [
  {
    url: "/og-image.jpg",
    width: 1200,
    height: 630,
    alt: "PT Prosper Witta Sejahtera",
  },
];
