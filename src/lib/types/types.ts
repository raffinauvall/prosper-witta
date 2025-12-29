export type Category = {
  id: number;
  name: string;
  slug: string;
};

export type ProductCategory = {
  product_id: number;
  category_id: number;
  categories?: Category;
};


export type Product = {
  id: number;
  name: string;
  description: string;
  full_desc: string;
  image: string;
  product_categories: ProductCategory[];
  display: boolean;
};

export type ProductDocument = {
  id: string; 
  product_id: number;
  type: "msds" | "tds";
  title?: string;
  file_url: string;

  created_at?: string;
};

export type DocumentAccessRequest = {
  id: string; // uuid
  document_id: string;
  device_token: string;

  company?: string;
  purpose?: string;

  status: "pending" | "approved" | "rejected";
  token: string; 

  created_at?: string;
};

export type DocumentAccessToken = {
  id: string; // uuid
  document_id: string;
  device_token: string;

  expires_at: string;
  created_at?: string;
};

export type ProductWithCategories = Omit<Product, "product_categories"> & {
  categories: Category[];
};

export type DocumentWithProduct = ProductDocument & {
  product: Pick<Product, "id" | "name">;
};

