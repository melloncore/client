export interface BlogImage {
  url: string;
  alt: string;
}

// Match your Prisma BlogPostStatus enum values
export type BlogPostStatus = "DRAFT" | "PUBLISHED";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // sanitized HTML from the backend
  images: BlogImage[]; // 1 to 3 images
  category: string;
  author: string;
  status: BlogPostStatus;
  date: string; // YYYY-MM-DD
  readTime: string;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}