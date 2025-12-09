"use client";

import { useState } from "react";

export default function CategoryFilter({ products, setFilteredProducts }: any) {
  const [category, setCategory] = useState("all");

  const handleCategoryFilter = (value: string) => {
    setCategory(value);

    if (value === "all") return setFilteredProducts(products);

    setFilteredProducts(products.filter((p: any) => p.categories?.includes(value)));
  };

  return (
    <select
      value={category}
      onChange={(e) => handleCategoryFilter(e.target.value)}
      className="border p-3 rounded-lg w-full md:w-64"
    >
      <option value="all">All Categories</option>
      <option value="home-care">Home & Personal Care</option>
      <option value="industrial-cleaner">Institutional & Industrial Cleaner</option>
      <option value="veterinary">Veterinary</option>
      <option value="mining">Mining</option>
      <option value="water-treatment">Water Treatment</option>
      <option value="metal-working">Metal Working</option>
    </select>
  );
}
