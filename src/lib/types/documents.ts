import { Product } from "./products";


export interface ProductDocument {
  id: string;
  product_id: number;
  type: "msds" | "tds";
  title?: string;
  file_url: string;
  created_at?: string;
}

export type DocumentAccessItem = {
  status: "none" | "pending" | "approved" | "rejected";
  accessId: string | null;
};


export interface ProductMsdsProps {
  status: DocumentAccessItem;
  onRequest: () => void;
  onView: () => void;
}

export interface ProductTdsProps {
  status: DocumentAccessItem;
  onRequest: () => void;
  onView: () => void;
}


export type AccessStatus = "none" | "pending" | "approved" | "rejected" | "unavailable";

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
  msds: DocumentAccessItem;
  tds: DocumentAccessItem;
}


export interface DocumentStatus {
  msds: boolean;
  tds: boolean;
}