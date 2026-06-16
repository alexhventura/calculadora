import type { ActiveTool } from '../utils/calculations/toolCalculations';

export interface ContentSubsection {
  id: string;
  title: string;
  level?: 3 | 4;
  paragraphs: string[];
  list?: string[];
}

export interface ContentSection {
  id: string;
  title: string;
  paragraphs: string[];
  list?: string[];
  subsections?: ContentSubsection[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface GlossaryItem {
  term: string;
  definition: string;
}

export interface InternalLink {
  label: string;
  href: string;
  description?: string;
}

export interface HubContentBase {
  slug: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  updatedAt: string;
  author: string;
  sections: ContentSection[];
  faq: FaqItem[];
  glossary: GlossaryItem[];
  sources: string[];
  relatedTools: InternalLink[];
  relatedCategories?: InternalLink[];
  relatedArticles?: InternalLink[];
}

export interface ToolSeoContent {
  tool: ActiveTool;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  sections: ContentSection[];
  faq: FaqItem[];
  sources: string[];
  relatedTools: { label: string; href: string; description: string }[];
}

export interface BlogArticle {
  slug: string;
  title: string;
  metaDescription: string;
  publishedAt: string;
  updatedAt: string;
  author: string;
  category: string;
  readTimeMinutes: number;
  intro: string;
  sections: ContentSection[];
  faq: FaqItem[];
}

export interface InstitutionalContent extends HubContentBase {
  slug: string;
  title: string;
  metaDescription: string;
}
