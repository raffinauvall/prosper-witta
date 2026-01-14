export interface News {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  thumbnail_url: string | null;
  published_at: string;
}
