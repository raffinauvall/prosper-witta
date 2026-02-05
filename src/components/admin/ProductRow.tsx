"use client";

import { useState, useEffect } from "react";
import { Product, DocumentStatus } from "@/lib/types";
import { getProductDocumentStatus } from "@/lib/api/documents/documents";
import CategoryModal from "./modals/CategoryModal";
import { CheckCircle, XCircle } from "lucide-react";

interface Props {
  product: Product;
  onDelete: (id: number) => void;
  onUpdate: (product: Product) => void;
}

export default function ProductRow({ product, onDelete, onUpdate }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [docStatus, setDocStatus] = useState<DocumentStatus>({ msds: false, tds: false });

  // Fetch document status per row (agar search/filter tetap cepat)
  useEffect(() => {
    let mounted = true;
    getProductDocumentStatus(product.id)
      .then((status) => {
        if (mounted) setDocStatus(status);
      })
      .catch(() => {
        if (mounted) setDocStatus({ msds: false, tds: false });
      });
    return () => {
      mounted = false;
    };
  }, [product.id]);

  const flattenedCategories = (product.product_categories ?? []).map((pc: any) => pc.categories ?? []);
  const visible = flattenedCategories.slice(0, 2);
  const extra = flattenedCategories.length - visible.length;

  return (
    <>
      <tr className="border-t">
        <td className="px-4 py-3 whitespace-nowrap">{product.name}</td>

        <td className="px-4 py-3 max-w-[250px]">
          <div className="flex gap-1 overflow-x-auto no-scrollbar whitespace-nowrap">
            {visible.map((c: any, idx: number) => (
              <span
                key={idx}
                className="px-2 py-1 text-xs bg-gray-200 rounded capitalize"
              >
                {c.name?.replace(/-/g, " ") ?? "Unknown"}
              </span>
            ))}
            {extra > 0 && (
              <button
                onClick={() => setModalOpen(true)}
                className="px-2 py-1 text-xs text-blue-700 rounded bg-blue-100"
              >
                +{extra} more
              </button>
            )}
          </div>
        </td>

        {/* MSDS */}
        {/* MSDS */}
        <td className="px-4 py-3 text-center">
          {docStatus.msds ? (
            <CheckCircle className="mx-auto w-5 h-5 text-green-600" />
          ) : (
            <XCircle className="mx-auto w-5 h-5 text-red-600" />
          )}
        </td>

        {/* TDS */}
        <td className="px-4 py-3 text-center">
          {docStatus.tds ? (
            <CheckCircle className="mx-auto w-5 h-5 text-green-600" />
          ) : (
            <XCircle className="mx-auto w-5 h-5 text-red-600" />
          )}
        </td>

        <td className="p-3 text-center">
          {product.display ? (
            <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">Yes</span>
          ) : (
            <span className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded">No</span>
          )}
        </td>

        {/* Actions */}
        <td className="px-4 py-3 text-center flex gap-4 justify-center">
          <button
            onClick={() => onUpdate(product)}
            className="text-blue-600 hover:underline"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className="text-red-600 hover:underline"
          >
            Delete
          </button>
        </td>
      </tr>

      {modalOpen && (
        <CategoryModal
          categories={flattenedCategories}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}
