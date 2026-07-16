/** @param {string} name */
export function productSlug(name) {
  return (
    name
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "product"
  );
}

/** @param {{ id: number, name: string }} product */
export function productPath(product) {
  return `/products/item/${product.id}/${productSlug(product.name)}`;
}
