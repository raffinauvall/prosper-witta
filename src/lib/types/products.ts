import { AccessStatus } from "./documents";


export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface ProductCategory {
  product_id: number;
  category_id: number;
  categories?: Category;
}

export interface Product {
  id: number;
  name: string;
  description: {
    id: string;
    en: string;
  };
  product_categories: ProductCategory[];
  display: boolean;
  status: AccessStatus;
}

export interface ProductWithCategories extends Omit<Product, "product_categories"> {
  categories: Category[];
}