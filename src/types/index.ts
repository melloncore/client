export interface Service {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: string;
  deliverables: string[];
  color: "coral" | "teal" | "brand";
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  initials: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  sections?: BlogSection[];
  content?: string;
  images?: BlogImage[];
}

export interface BlogImage {
  url: string;
  alt: string;
}

export interface BlogSection {
  id: string;
  heading: string;
  paragraphs: string[];
  takeaways?: string[];
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface ValueItem {
  title: string;
  description: string;
}

export interface Stat {
  label: string;
  value: string;
}
