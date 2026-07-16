"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import ProductHeader from "@/components/products/ProductHeader";
import ProductSidebar from "@/components/products/ProductSidebar";
import ProductDetail from "@/components/products/ProductDetail";
import ProductMsds from "./ProductMsds";
import ProductTds from "./ProductTds";
import { CATEGORY_INFO, CategoryKey } from "@/lib/category-info";

import RequestAccessModal from "./modals/RequestAccessModal";
import RequestSampleWidget from "./RequestSample";
import RequestSampleModal from "./modals/RequestSampleModal";

import { AccessStatusItem, fetchAccessStatus } from "@/lib/api/documents/document-access";
import type { DocumentStatus, PublicProduct } from "@/lib/types";
import { getProductDocumentAvailability } from "@/lib/api/documents/documents";
import Footer from "../Footer";
import Navbar from "../Navbar";

interface ProductContainerProps {
  category: CategoryKey;
  products: PublicProduct[];
  selectedId?: number;
}

export default function ProductContainer({
  category,
  products,
  selectedId,
}: ProductContainerProps) {
  const router = useRouter();
  const info = CATEGORY_INFO[category];
  const selected =
    products.find((product) => product.id === selectedId) ?? products[0] ?? null;

  const [modalOpen, setModalOpen] = useState(false);
  const [docType, setDocType] = useState<"msds" | "tds">("msds");
  const [sampleOpen, setSampleOpen] = useState(false);
  const [availability, setAvailability] = useState<DocumentStatus>({
    msds: false,
    tds: false,
  });
  const [accessStatus, setAccessStatus] = useState<{
    msds: AccessStatusItem;
    tds: AccessStatusItem;
  }>({
    msds: { status: "none", accessId: null },
    tds: { status: "none", accessId: null },
  });

  useEffect(() => {
    if (!selected) return;

    const loadData = async () => {
      try {
        setAvailability({ msds: false, tds: false });
        setAccessStatus({
          msds: { status: "none", accessId: null },
          tds: { status: "none", accessId: null },
        });
        const avail = await getProductDocumentAvailability(selected.id);
        setAvailability(avail);

        const [msdsStatus, tdsStatus] = await Promise.all([
          fetchAccessStatus(selected.id, "msds"),
          fetchAccessStatus(selected.id, "tds"),
        ]);

        setAccessStatus({
          msds: { status: msdsStatus.status, accessId: msdsStatus.accessId || null },
          tds: { status: tdsStatus.status, accessId: tdsStatus.accessId || null },
        });
      } catch (err) {
        console.error("Failed to load documents/access status", err);
        setAvailability({ msds: false, tds: false });
        setAccessStatus({
          msds: { status: "none", accessId: null },
          tds: { status: "none", accessId: null },
        });
      }
    };

    loadData();
  }, [selected]);

  useEffect(() => {
    const onFocus = () => {
      if (!selected) return;
      fetchAccessStatus(selected.id, "msds").then(msds => {
        fetchAccessStatus(selected.id, "tds").then(tds => {
          setAccessStatus({
            msds: { status: msds.status, accessId: msds.accessId || null },
            tds: { status: tds.status, accessId: tds.accessId || null },
          });
        });
      });
    };
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [selected]);

  const handleRequest = (type: "msds" | "tds") => {
    setDocType(type);
    setModalOpen(true);
  };

  const handleView = (type: "msds" | "tds") => {
    const accessId = accessStatus[type].accessId;
    if (!accessId) {
      console.warn(`${type.toUpperCase()} Access ID belum tersedia!`);
      return;
    }
    router.push(`/documents?accessId=${accessId}&type=${type}`);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 px-6 py-12 pt-[90px]">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/products"
            className="flex items-center gap-2 text-sm text-blue-600 mb-3 hover:underline mt-3"
          >
            <ArrowLeft size={18} /> Back
          </Link>

          <div className="flex justify-between items-center">
            <ProductHeader
              Icon={info.icon}
              color={info.theme}
              title={info.title}
              desc={info.desc}
              headingTag={selectedId ? "p" : "h1"}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-3">
              <ProductSidebar
                products={products}
                selected={selected?.id}
                themeColor={info.theme}
              />
            </div>

            <div className="lg:col-span-6">
              {selected && (
                <>
                  <ProductDetail
                    selected={selected}
                    headingTag={selectedId ? "h1" : "h2"}
                  />

                  <div className="mt-6 flex flex-col gap-4 md:flex-row">
                    <ProductMsds
                      status={accessStatus.msds}
                      hasDocument={availability.msds}
                      onRequest={() => handleRequest("msds")}
                      onView={() => handleView("msds")}
                    />

                    <ProductTds
                      status={accessStatus.tds}
                      hasDocument={availability.tds}
                      onRequest={() => handleRequest("tds")}
                      onView={() => handleView("tds")}
                    />
                  </div>
                </>
              )}
            </div>

            {selected && (
              <RequestAccessModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                productId={selected.id}
                type={docType}
              />
            )}

            <div className="lg:col-span-3">
              {selected && (
                <>
                  <RequestSampleWidget onRequestSample={() => setSampleOpen(true)} />

                  <RequestSampleModal
                    open={sampleOpen}
                    onClose={() => setSampleOpen(false)}
                    productId={selected.id}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
