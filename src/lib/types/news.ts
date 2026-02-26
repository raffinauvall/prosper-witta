export interface News {
  id: string;
  title: string;
  slug?: string;
  excerpt?: {
    id: string;
    en: string;
  };
  content?: {
    id: string;
    en: string;
  };
  thumbnail_url?: string;
  is_published?: boolean;
  published_at?: string;
}

export interface NewsForm {
  title: string;
  slug: string;
  excerpt: {
    id: string;
    en: string;
  };
  content: {
    id: string;
    en: string;
  };
  thumbnail_url: string;
  is_published: boolean;
  published_at: string;
}

export type NewsFormData = {
  title: string;
  slug?: string;
  excerpt?: {
    id: string;
    en: string;
  };
  content?: {
    id: string;
    en: string;
  };
  thumbnail_url?: string;
  is_published: boolean;
  published_at?: string;
};
