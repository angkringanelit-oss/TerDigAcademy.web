export type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string;
  category: string;
  author: string;
  published_at: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export type ArticleCategory = {
  value: string;
  label: string;
};