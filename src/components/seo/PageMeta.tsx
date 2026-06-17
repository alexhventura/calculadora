import { useEffect } from 'react';
import { SITE_NAME, SITE_URL, SITE_OG_IMAGE } from '../../constants/site';

export interface PageMetaProps {
  title: string;
  description: string;
  canonical?: string;
  ogType?: 'website' | 'article';
  noindex?: boolean;
}

function setMeta(name: string, content: string, isProperty = false) {
  const attr = isProperty ? 'property' : 'name';
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href: string) {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.rel = 'canonical';
    document.head.appendChild(el);
  }
  el.href = href;
}

export default function PageMeta({
  title,
  description,
  canonical,
  ogType = 'website',
  noindex = false,
}: PageMetaProps) {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const canonicalUrl = canonical ?? SITE_URL;

  useEffect(() => {
    document.title = fullTitle;
    setMeta('description', description);
    setMeta('robots', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large');
    setCanonical(canonicalUrl);
    setMeta('og:type', ogType, true);
    setMeta('og:locale', 'pt_BR', true);
    setMeta('og:url', canonicalUrl, true);
    setMeta('og:site_name', SITE_NAME, true);
    setMeta('og:title', fullTitle, true);
    setMeta('og:description', description, true);
    setMeta('og:image', SITE_OG_IMAGE, true);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image', SITE_OG_IMAGE);
  }, [fullTitle, description, canonicalUrl, ogType, noindex]);

  return null;
}
