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
  status: AccessStatus;
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
  product_id: string;
  device_token: string;

  name: string;
  email: string;
  company?: string;
  purpose?: string;

  status: "pending" | "approved" | "rejected";
  token: string; 

  created_at?: string;
  decided_at?: string | null;
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

export type AccessStatus = "none" | "pending" | "approved" | "rejected";

export type DocumentAccessStatus = {
  msds: AccessStatus;
  tds: AccessStatus;
};


export type ProductMsdsProps = {
  productId: number;
  status: AccessStatus;
  onRequest: (type: "msds") => void;
  onView: () => void;
};
export type ProductTdsProps = {
  productId: number;
  status: AccessStatus;
  onRequest: (type: "tds") => void;
  onView: () => void;
};

export type RequestSample = {
  full_name: string;
  company_name?: string;
  email: string;
  phone: string;
  shipping_address?: string;
  purpose?: string;
};
