import { Link } from 'react-router-dom';
import PageMeta from '../components/seo/PageMeta';
import StructuredData from '../components/seo/StructuredData';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import ContentHeader from '../components/content/ContentHeader';
import TableOfContents from '../components/content/TableOfContents';
import LongFormArticle from '../components/content/LongFormArticle';
import FaqSection from '../components/content/FaqSection';
import GlossarySection from '../components/content/GlossarySection';
import InternalLinksSection from '../components/content/InternalLinksSection';
import EeatBlock from '../components/content/EeatBlock';
import { INSTITUTIONAL_PAGES } from '../content/institutional/pages';
import { estimateReadTime } from '../content/categories';
import { ROUTES } from '../constants/routes';
import { SITE_URL } from '../constants/site';

const PAGE_PATHS: Record<keyof typeof INSTITUTIONAL_PAGES, string> = {
  sobre: ROUTES.sobre,
  contato: ROUTES.contato,
  privacidade: ROUTES.privacidade,
  termos: ROUTES.termos,
  cookies: ROUTES.cookies,
  isencao: ROUTES.isencao,
};

interface InstitutionalPageProps {
  pageKey: keyof typeof INSTITUTIONAL_PAGES;
}

export default function InstitutionalPage({ pageKey }: InstitutionalPageProps) {
  const content = INSTITUTIONAL_PAGES[pageKey];
  const path = PAGE_PATHS[pageKey];
  const readTime = estimateReadTime(content);

  return (
    <>
      <PageMeta
        title={content.metaTitle ?? content.title}
        description={content.metaDescription}
        canonical={`${SITE_URL}${path}`}
      />
      <StructuredData
        breadcrumbs={[
          { name: 'Início', href: '/' },
          { name: content.title },
        ]}
        faq={content.faq.length > 0 ? content.faq : undefined}
      />
      <main id="conteudo-principal" className="max-w-3xl mx-auto w-full min-w-0 px-4 md:px-8 py-10 flex-1">
        <Breadcrumbs items={[{ label: 'Início', href: '/' }, { label: content.title }]} />
        <ContentHeader
          h1={content.h1 ?? content.title}
          intro={content.intro}
          author={content.author}
          updatedAt={content.updatedAt}
          readTimeMinutes={readTime}
        />
        <TableOfContents sections={content.sections} />
        <LongFormArticle sections={content.sections} />
        <div className="mt-10 flex flex-col gap-8">
          {content.faq.length > 0 && <FaqSection items={content.faq} />}
          <GlossarySection items={content.glossary} />
          <InternalLinksSection
            tools={content.relatedTools}
            categories={content.relatedCategories}
          />
          <EeatBlock sources={content.sources} updatedAt={content.updatedAt} />
        </div>
        <p className="mt-6 text-xs text-slate-500">
          <Link to={ROUTES.home} className="text-[#800020] font-semibold hover:underline">
            ← Voltar às calculadoras
          </Link>
        </p>
      </main>
    </>
  );
}
