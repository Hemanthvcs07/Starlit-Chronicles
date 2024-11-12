export interface Post {
  id: number;
  title: string;
  content: string;
  image: string;
  background: string;
  author: string;
  date: string;
  categories: string[];
  tags: string[];
  readingTime: string;
  slug: string;
  metaDescription: string;
  isFeatured: boolean;
  commentsCount: number;
  shares: number;
}
