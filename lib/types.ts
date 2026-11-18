export type Language = 'ru' | 'uzb';

export type Theme = 'dark' | 'light';

export type ProjectCategory = 'all' | 'frontend' | 'fullstack' | 'ecommerce' | 'telegram' | 'other';

export interface Project {
  id: string;
  title: string;
  category: 'frontend' | 'fullstack' | 'ecommerce' | 'telegram' | 'other';
  description: string;
  tech: string[];
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  createdAt: string;
}
