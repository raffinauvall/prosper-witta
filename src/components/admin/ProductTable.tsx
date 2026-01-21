import { Product } from "@/lib/types";
import { normalizeArray } from "utils/helper";
import ProductRow from "./ProductRow";

interface Props {
  products: Product[] | { data: Product[] } | null | undefined;
  onDelete: (id: number) => void;
  onUpdate: (p: Product) => void;
}

export default function ProductTable({ products, onDelete, onUpdate }: Props) {
  const rows = normalizeArray<Product>(products);

  if (rows.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        Belum ada produk.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm border border-gray-200 rounded-lg">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-6 py-3 text-left font-semibold text-gray-600">
              Name
            </th>
            <th className="px-6 py-3 text-left font-semibold text-gray-600">
              Categories
            </th>
            <th className="px-6 py-3 text-left font-semibold text-gray-600">
              Actions
            </th>
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
