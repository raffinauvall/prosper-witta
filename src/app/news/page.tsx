import { Metadata } from "next";
import { getNewsList } from "@/lib/api/news";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsClient from "@/components/news/NewsClient";
import NewsHeader from "@/components/news/NewsHeader";


export const metadata: Metadata = {
  title: "News",
  description:
    "Read news and updates from PT Prosper Witta Sejahtera about chemical products, industry applications, and company activities.",
  alternates: {
    canonical: "/news",
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
