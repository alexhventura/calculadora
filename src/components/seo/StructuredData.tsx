import { SITE_NAME, SITE_URL } from '../../constants/site';
import type { FaqItem } from '../../content/types';

interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface StructuredDataProps {
  breadcrumbs: BreadcrumbItem[];
  faq?: FaqItem[];
  article?: {
    title: string;
    description: string;
    url: string;
    publishedAt: string;
    updatedAt: string;
    author: string;
  };
  webApplication?: {
    name: string;
    description: string;
    url: string;
  };
}

export default function StructuredData({
  breadcrumbs,
  faq,
  article,
  webApplication,
}: StructuredDataProps) {
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/favicon.svg`,
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description:
        'Calculadora de juros compostos grátis com comparativo Poupança vs Selic/CDI, conversor de moedas e ferramentas financeiras.',
      publisher: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'pt-BR',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.name,
        ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
      })),
    },
  ];

  if (faq && faq.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    });
  }

  if (article) {
    graph.push({
      '@type': 'Article',
      headline: article.title,
      description: article.description,
      url: article.url,
      datePublished: article.publishedAt,
      dateModified: article.updatedAt,
      author: { '@type': 'Organization', name: article.author },
      publisher: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'pt-BR',
    });
  }

  if (webApplication) {
    graph.push({
      '@type': 'WebApplication',
      name: webApplication.name,
      description: webApplication.description,
      url: webApplication.url,
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
      inLanguage: 'pt-BR',
    });
  }

  const schema = { '@context': 'https://schema.org', '@graph': graph };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
