export interface News {
  id: number;
  title: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  thumbnail_url?: string;
  is_published?: boolean;
  published_at?: string;
}

export interface NewsForm {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  thumbnail_url: string;
  is_published: boolean;
  published_at: string;
}

export type NewsFormData = {
  title: string;              
  slug?: string;
  excerpt?: string;
  content?: string;
  thumbnail_url?: string;
  is_published: boolean;     
  published_at?: string;
};