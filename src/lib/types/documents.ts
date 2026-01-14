import { Product } from "./products";


export interface ProductDocument {
  id: string;
  product_id: number;
  type: "msds" | "tds";
  title?: string;
  file_url: string;
  created_at?: string;
}

export interface ProductMsdsProps {
  productId: number;
  status: AccessStatus;
  onRequest: (type: "msds") => void;
  onView: () => void;
}

export interface ProductTdsProps {
  productId: number;
  status: AccessStatus;
  onRequest: (type: "tds") => void;
  onView: () => void;
}

export type AccessStatus = "none" | "pending" | "approved" | "rejected";

export interface DocumentWithProduct extends ProductDocument {
  product: Pick<Product, "id" | "name">;
}

export interface DocumentAccessRequest {
  id: string; 
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
}

export type AccessRequest = Pick<
  DocumentAccessRequest,
  "id" | "name" | "company" | "email" | "purpose" | "status"
> & {
  type: "msds" | "tds";
  products?: { name: string };
  created_at: string;
};

export interface RequestAccessResponse {
  data: AccessRequest[];
  total: number;
}

export interface DocumentAccessToken {
  id: string;
  document_id: string;
  device_token: string;
  expires_at: string;
  created_at?: string;
}

export interface DocumentAccessStatus {
  msds: "none" | "pending" | "approved" | "rejected";
  tds: "none" | "pending" | "approved" | "rejected";
}

export interface DocumentStatus {
  msds: boolean;
  tds: boolean;
}