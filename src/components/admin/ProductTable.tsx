"use client";

import { useState } from "react";
import { Product } from "@/lib/types";
import ProductRow from "./ProductRow";

interface Props {
  products: Product[] | { data: Product[] } | null | undefined;
  onDelete: (id: number) => void;
  onUpdate: (product: Product) => void;
}

export default function ProductTable({ products, onDelete, onUpdate }: Props) {
  const rows: Product[] = products
    ? Array.isArray(products)
      ? products
      : "data" in products && Array.isArray(products.data)
      ? products.data
      : []
    : [];

  if (!rows.length) {
    return (
      <div className="p-6 text-center text-gray-500">
        Belum ada produk.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full text-sm border border-gray-200 rounded-lg">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-4 py-3 text-left font-semibold text-gray-600">Name</th>
            <th className="px-4 py-3 text-left font-semibold text-gray-600">Categories</th>
            <th className="px-4 py-3 text-center font-semibold text-gray-600">MSDS</th>
            <th className="px-4 py-3 text-center font-semibold text-gray-600">TDS</th>
            <th className="px-4 py-3 text-center font-semibold text-gray-600">Display</th>
            <th className="px-4 py-3 text-center font-semibold text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {rows.map((product) => (
            <ProductRow
              key={product.id}
              product={product}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
