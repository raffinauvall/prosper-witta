import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin",
        "/admin/",
        "/api/",
        "/login",
        "/approve",
        "/request-approved",
        "/request-rejected",
      ],
    },
    sitemap: `${getSiteUrl()}/sitemap.xml`,
  };
}
