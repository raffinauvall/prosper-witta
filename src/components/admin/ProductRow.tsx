"use client";

import { useState } from "react";
import Link from "next/link";
import CategoryModal from "./modals/CategoryModal";
import { Product } from "@/lib/types";

interface Props {
  product: Product;
  onDelete: (id: number) => void;
  onUpdate: (product: Product) => void;
}


export default function ProductRow({ product, onDelete, onUpdate }: Props) {
  const [modalOpen, setModalOpen] = useState(false);

  const flattenedCategories = (product.product_categories ?? []).map((pc: any) => pc.categories ?? []);


  const visible = flattenedCategories.slice(0, 2);
  const extra = flattenedCategories.length - visible.length;

  const getCategoryName = (c: { name?: string; slug?: string }) => {
    return c.name ? c.name.replace(/-/g, " ") : c.slug?.replace(/-/g, " ") || "Unknown";
  };

  return (
    <>
      <tr className="border-t">
        <td className="p-4 whitespace-nowrap">{product.name}</td>

        <td className="p-4 max-w-[260px]">
          <div className="flex gap-1 overflow-x-auto no-scrollbar whitespace-nowrap">
            {visible.map((c) => (
              <span
                key={c.id} 
                className="px-2 py-1 text-xs bg-gray-200 rounded capitalize"
              >
                {c.name?.replace(/-/g, " ") ?? "Unknown"}
              </span>
            ))}


            {extra > 0 && (
              <button
                onClick={() => setModalOpen(true)}
                className="px-2 py-1 text-xs bg-blue-200 rounded text-blue-700"
              >
                +{extra} more
              </button>
            )}
          </div>
        </td>

        <td className="p-4 whitespace-nowrap">
          <div className="flex gap-3 items-center">
            <button
              onClick={() => onUpdate(product)}>Edit</button>

            <button
              onClick={() => {
                console.log("Deleting product id:", product.id);
                onDelete(product.id);
              }}
              className="text-red-600"
            >
              Delete
            </button>
          </div>
        </td>
      </tr>

      {modalOpen && (
        <CategoryModal
          categories={flattenedCategories} // pake flattened data
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}
