export interface RequestSample {
  full_name: string;
  company_name?: string;
  email: string;
  phone: string;
  shipping_address?: string;
  purpose?: string;
}

export interface RequestSampleRow extends RequestSample {
  id: string;
  requested_at: string;
  products: { name: string } | null;
}

export interface RequestSampleResponse {
  data: RequestSampleRow[];
  page: number;
  limit: number;
  total: number;
}
