"use client";

export default function SearchBar({ products, setFilteredProducts }: any) {
  const handleSearch = (value: string) => {
    setFilteredProducts(
      products.filter((p: any) =>
        p.name.toLowerCase().includes(value.toLowerCase())
      )
    );
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
