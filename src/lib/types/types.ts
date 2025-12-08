// types.ts
export type Category = {
  id: number;
  name: string;
  slug: string;
};

export type ProductCategory = Category[];

export type Product = {
  id: number;
  name: string;
  description: string;
  full_desc: string;
  ingredients: string;
  image: string;
  product_categories: ProductCategory;
};
