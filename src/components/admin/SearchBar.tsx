"use client";

import { Product } from "@/lib/types";

interface Props {
  products: Product[] | undefined | null; // bisa undefined/null
  setFilteredProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

export default function SearchBar({ products, setFilteredProducts }: Props) {
  const handleSearch = (value: string) => {
    if (!products || products.length === 0) {
      setFilteredProducts([]);
      return;
    }

    const searchValue = value.toLowerCase().trim();

    if (searchValue === "") {
      // reset ke semua product kalau input kosong
      setFilteredProducts(products);
      return;
    }

    const filtered = products.filter((p) =>
      p.name.toLowerCase().includes(searchValue)
    );

    setFilteredProducts(filtered);
  };

  return (
    <input
      type="text"
      placeholder="Search product..."
      onChange={(e) => handleSearch(e.target.value)}
      className="border p-3 rounded-lg w-full"
    />
  );
}
