import { Metadata } from "next";
import { getNewsList } from "@/lib/api/news";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsClient from "@/components/news/NewsClient";
import NewsHeader from "@/components/news/NewsHeader";
import { defaultOpenGraphImages } from "@/lib/seo";


export const metadata: Metadata = {
  title: "News & Updates — Latest Industry Insights",
  description:
    "Read the latest news, articles, and industry updates from PT Prosper Witta Sejahtera about specialty chemical products, market trends, and company activities.",
  alternates: {
    canonical: "/news",
  },
  openGraph: {
    title: "News & Updates — PT Prosper Witta Sejahtera",
    description:
      "Stay updated with the latest chemical industry news, product updates, and company activities.",
    url: "/news",
    images: defaultOpenGraphImages,
  },
};

export default async function NewsPage() {
  const news = await getNewsList(); 
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 pt-[80px]">
      <Navbar />
      <NewsHeader />
      <NewsClient news={news} />
      <Footer />
    </div>
  );
}
