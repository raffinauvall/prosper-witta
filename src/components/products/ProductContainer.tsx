"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { useProducts } from "@/hooks/useProduct";
import ProductHeader from "@/components/products/ProductHeader";
import ProductSidebar from "@/components/products/ProductSidebar";
import ProductDetail from "@/components/products/ProductDetail";
import ProductMsds from "./ProductMsds";
import ProductTds from "./ProductTds";
import DetailSkeleton from "@/components/products/DetailSkeleton";
import { CATEGORY_INFO, CategoryKey } from "@/lib/category-info";

import RequestAccessModal from "./modals/RequestAccessModal";
import RequestSampleWidget from "./RequestSample";
import RequestSampleModal from "./modals/RequestSampleModal";

import { AccessStatusItem, fetchAccessStatus } from "@/lib/api/documents/document-access";
import type { DocumentAccessStatus } from "@/lib/types";
import { getDeviceToken } from "@/lib/deviceToken";
import Footer from "../Footer";
import Navbar from "../Navbar";

interface ProductContainerProps {
  category: CategoryKey;
}

export default function ProductContainer({ category }: ProductContainerProps) {
  const router = useRouter();
  const info = CATEGORY_INFO[category];

  const [modalOpen, setModalOpen] = useState(false);
  const [docType, setDocType] = useState<"msds" | "tds">("msds");
  const [sampleOpen, setSampleOpen] = useState(false);

  const [accessStatus, setAccessStatus] = useState<{
    msds: AccessStatusItem;
    tds: AccessStatusItem;
  }>({
    msds: { status: "none", accessId: null },
    tds: { status: "none", accessId: null },
  });


  const { products, selected, setSelected, loading, error } =
    useProducts(category);


  const loadAccessStatus = async () => {
    if (!selected) return;

    const [msdsStatus, tdsStatus] = await Promise.all([
      fetchAccessStatus(selected.id, "msds"),
      fetchAccessStatus(selected.id, "tds"),
    ]);

    setAccessStatus({
      msds: {
        status: msdsStatus.status,
        accessId: msdsStatus.accessId || null,
      },
      tds: {
        status: tdsStatus.status,
        accessId: tdsStatus.accessId || null,
      },
    });
  };



  console.log("ACCESS STATUS", accessStatus);
  useEffect(() => {
    loadAccessStatus();
  }, [selected]);

  useEffect(() => {
    const onFocus = () => loadAccessStatus();
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [selected]);

  useEffect(() => {
    if (!modalOpen) {
      loadAccessStatus();
    }
  }, [modalOpen]);


  const deviceToken = getDeviceToken();

  const handleRequest = (type: "msds" | "tds") => {
    setDocType(type);
    setModalOpen(true);
  };

  const handleSelectProduct = (id: number) => {
    const product = products.find((p) => p.id === id) || null;
    setSelected(product);
  };

  return (
    <>
    <Navbar />
    <main className="min-h-screen bg-gray-50 px-6 py-12 pt-[90px]">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <ProductHeader
            selected={selected?.id}
            Icon={info.icon}
            color={info.theme}
            title={info.title}
            desc={info.desc}
          />

          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-white p-4 px-6 rounded-full bg-blue-900"
          >
            <ArrowLeft size={18} /> Back
          </button>
        </div>

        {error && <p className="text-red-600 my-4">{error}</p>}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3">
            <ProductSidebar
              products={products}
              selected={selected?.id}
              setSelected={handleSelectProduct}
              themeColor={info.theme}
              loading={loading}
            />
          </div>

          <div className="lg:col-span-6">
            {loading && <DetailSkeleton />}

            {!loading && selected && (
              <>
                <ProductDetail selected={selected} />

                <div className="mt-6 flex flex-col gap-4 md:flex-row">
                  <ProductMsds
                    status={accessStatus.msds}
                    onRequest={() => handleRequest("msds")}
                    onView={() => {
                      const accessId = accessStatus.msds.accessId;
                      if (!accessId) {
                        console.warn("Access ID belum tersedia!");
                        return;
                      }
                      console.log("Opening MSDS document with accessId:", accessId);
                      router.push(`/documents?accessId=${accessId}&type=msds`);
                    }}
                  />

                  <ProductTds
                    status={accessStatus.tds}
                    onRequest={() => handleRequest("tds")}
                    onView={() => {
                      const accessId = accessStatus.tds.accessId;
                      if (!accessId) {
                        console.warn("Access ID belum tersedia!");
                        return;
                      }
                      router.push(`/documents?accessId=${accessId}&type=tds`);
                    }}
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
                <RequestSampleWidget
                  onRequestSample={() => setSampleOpen(true)}
                />

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
