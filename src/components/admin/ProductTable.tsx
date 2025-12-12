"use client";

import ProductRow from "./ProductRow";
import { Product } from "@/src/lib/types/types";

interface Props {
  products: Product[];
  onDelete: (id: number) => void;
  onUpdate: (p: Product) => void;
}

export default function ProductTable({ products, onDelete, onUpdate }: Props) {
  return (
    <table className="w-full border">
      <thead>
        <tr>
          <th className="p-4 text-left">Name</th>
          <th className="p-4 text-left">Categories</th>
          <th className="p-4 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <ProductRow key={product.id} product={product} onDelete={onDelete} onUpdate={onUpdate} />
        ))}
      </tbody>
    </table>
  );
}
